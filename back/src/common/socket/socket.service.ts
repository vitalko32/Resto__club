import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { IOrder } from "src/api.restorator/orders/dto/order.interface";
import { IOrderProduct } from "src/api.restorator/orders/dto/order.product.interface";
import { Lang } from "src/model/orm/lang.entity";
import { Order } from "src/model/orm/order.entity";
import { OrderProduct } from "src/model/orm/order.product.entity";
import { Serving } from "src/model/orm/serving.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import { In, Repository } from "typeorm";
import { IMsg } from "./dto/msg.interface";
import { IOrderAccepted } from "./dto/order.accepted.interface";
import { IOrderNeedInvoice } from "./dto/order.need.invoice.interface";
import { IOrderNeedProducts } from "./dto/order.need.products.interface";
import { IServing } from "./dto/serving.interface";

@Injectable()
export class SocketService {
    private apiEndpoint: string = "api/translate";

    constructor(
        @InjectRepository(WSServer) private wsserverRepository: Repository<WSServer>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderProduct) private orderProductRepository: Repository<OrderProduct>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
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
            const order: IOrder = await this.orderRepository.findOne(order_id, {relations: ["products", "products.serving", "products.serving.translations", "products.ingredients", "table", "table.hall"]});

            if (order) {
                const langs: Lang[] = await this.langRepository.find({where: {active: true}});

                for (let p of order.products) {
                    p.serving = this.buildMlServing(p.serving as Serving, langs);
                }
                
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

    public async translateNeedProducts(order_id: number, product_ids: number[]): Promise<void> {
        try {
            const order = await this.orderRepository.findOne(order_id);

            if (order) {
                const langs: Lang[] = await this.langRepository.find({where: {active: true}});
                const products: IOrderProduct[] = await this.orderProductRepository.find({where: {id: In(product_ids)}, relations: ["ingredients", "serving", "serving.translations"]});

                for (let p of products) {
                    p.serving = this.buildMlServing(p.serving as Serving, langs);
                }
                
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

    public buildMlServing(serving: Serving, langs: Lang[]): IServing {
        const name = {};
        
        for (let l of langs) {
            name[l.slug] = serving.translations.find(t => t.lang_id === l.id)?.name;
        }
        
        return {id: serving.id, name};
    }
}