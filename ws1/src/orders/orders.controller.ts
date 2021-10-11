import { Controller, Param, Post, Body } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller('api/orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}            

    // test
    @Post("test")
    public test(): string {
        return this.ordersService.test();
    }    
}
