import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Order } from "src/model/orm/order.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import { Repository } from "typeorm";
import { ISocketMsg } from "./dto/socket.msg.interface";

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
                this.translateMsg({
                    name: `created-${order.restaurant_id}`, 
                    data: order,
                });                
            }            
        } catch (err) {
            const errTxt: string = `Error in SocketService.translateOrderCreated: ${String(err)}`;
            console.log(errTxt);            
        }   
    }
    
    private async translateMsg(msg: ISocketMsg): Promise<void> {
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