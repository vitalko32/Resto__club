import { Controller, Param, Post, Body } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { OrdersService } from "./orders.service";
import { IOrderCreate } from "./dto/order.create.interface";
import { Order } from "src/model/orm/order.entity";

@Controller('api/customer/orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}                    

    // get fragment    
    @Post("create")
    public create(@Body() dto: IOrderCreate): Promise<IAnswer<Order>> {
        return this.ordersService.create(dto);
    }    
}
