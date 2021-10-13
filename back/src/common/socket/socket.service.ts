import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Order } from "src/model/orm/order.entity";
import { OrderProduct } from "src/model/orm/order.product.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import { Repository } from "typeorm";
import { IMsg } from "./dto/msg.interface";
import { IOrderAccepted } from "./dto/order.accepted.interface";
import { IOrderNeedInvoice } from "./dto/order.need.invoice.interface";
import { IOrderNeedProducts } from "./dto/order.need.products.interface";

@Injectable()
export class SocketService {
    private apiEndpoint: string = "api/translate";

    constructor(
        @InjectRepository(WSServer) private wsserverRepository: Repository<WSServer>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) {}

    public async translateOrderCreated(order_id: number): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id, {relations: ["products", "table", "table.hall"]});

            if (order) {
                const name = order.employee_id ? `created-${order.restaurant_id}-${order.employee_id}` : `created-${order.restaurant_id}`;
                const data = order;
                this.translateMsg({name, data});                
            }            
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateOrderCreated: ${String(err)}`;
            console.log(errTxt);            
        }   
    }

    public async translateOrderUpdated(order_id: number): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id, {relations: ["products", "table", "table.hall"]});

            if (order) {
                const name = `updated-${order.restaurant_id}`;
                const data = order;
                this.translateMsg({name, data});                
            }            
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateOrderUpdated: ${String(err)}`;
            console.log(errTxt);            
        }   
    }

    public async translateNeedWaiter(order_id: number): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id);

            if (order) {
                const name = order.employee_id ? `need-waiter-${order.restaurant_id}-${order.employee_id}` : `need-waiter-${order.restaurant_id}`;
                const data = order.id;
                this.translateMsg({name, data});                     
            } 
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateNeedWaiter: ${String(err)}`;
            console.log(errTxt);            
        }  
    }

    public async translateNeedInvoice(order_id: number): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id);

            if (order) {
                const name = order.employee_id ? `need-invoice-${order.restaurant_id}-${order.employee_id}` : `need-invoice-${order.restaurant_id}`;
                const data: IOrderNeedInvoice = {order_id, paymethod: order.paymethod};
                this.translateMsg({name, data});
            } 
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateNeedInvoice: ${String(err)}`;
            console.log(errTxt);            
        }  
    }

    public async translateNeedProducts(order_id: number, products: OrderProduct[]): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id);

            if (order) {
                const name = order.employee_id ? `need-products-${order.restaurant_id}-${order.employee_id}` : `need-products-${order.restaurant_id}`;
                const data: IOrderNeedProducts = {order_id, products};
                this.translateMsg({name, data});
            } 
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateNeedProducts: ${String(err)}`;
            console.log(errTxt);            
        }  
    }

    public async translateOrderCancelled(order_id: number): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id);

            if (order) {
                const name = `cancelled-${order.restaurant_id}`;
                const data = order_id;
                this.translateMsg({name, data});
            } 
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateOrderCancelled: ${String(err)}`;
            console.log(errTxt);            
        }  
    }

    public async translateOrderCompleted(order_id: number): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id);

            if (order) {
                const name = `completed-${order.restaurant_id}`;
                const data = order_id;
                this.translateMsg({name, data});
            } 
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateOrderCompleted: ${String(err)}`;
            console.log(errTxt);            
        }  
    }

    public async translateOrderAccepted(order_id: number): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id);

            if (order) {
                const name = `accepted-${order.restaurant_id}`;
                const data: IOrderAccepted = {order_id, employee_id: order.employee_id};
                this.translateMsg({name, data});
            } 
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateOrderAccepted: ${String(err)}`;
            console.log(errTxt);            
        }  
    }

    public async translateOrderDeleted(order: Order): Promise<void> {
        try {            
            const name = `deleted-${order.restaurant_id}`;
            const data = order.id;
            this.translateMsg({name, data});             
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateOrderDeleted: ${String(err)}`;
            console.log(errTxt);            
        }  
    }
    
    private async translateMsg(msg: IMsg): Promise<void> {
        try {
            const servers = await this.wsserverRepository.find();
            
            for (let s of servers) {
                axios.post(`${s.url}/${this.apiEndpoint}`, msg);
            }            
        } catch (err) {
            const errTxt: string = `Error in SocketService.sendMsg: ${String(err)}`;
            console.log(errTxt);            
        }        
    }
}