import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { OrdersService } from "./orders.service";
import { Order } from "../../model/orm/order.entity";
import { IGetAll } from "src/model/dto/getall.interface";
import { EmployeesGuard } from "src/common/guards/employees.guard";

@Controller('api/restorator/orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Order[]>> {
        return this.ordersService.all(dto);
    }     
}
