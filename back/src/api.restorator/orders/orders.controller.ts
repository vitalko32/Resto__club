import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { OrdersService } from "./orders.service";
import { Order } from "../../model/orm/order.entity";
import { IGetAll } from "src/model/dto/getall.interface";
import { EmployeesGuard } from "src/common/guards/employees.guard";
import { IOrderAccept } from "./dto/order.accept.interface";
import { IOrder } from "./dto/order.interface";
import { IOrderUpdate } from "./dto/order.update.interface";
import { IOrderCreate } from "./dto/order.create.interface";
import { IGetChunk } from "src/model/dto/getchunk.interface";

@Controller('api/restorator/orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Order[]>> {
        return this.ordersService.all(dto);
    } 

    // get fragment
    @UseGuards(EmployeesGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Order[]>> {
        return this.ordersService.chunk(dto);
    } 
    
    // accept
    @UseGuards(EmployeesGuard)
    @Post("accept")
    public accept(@Body() dto: IOrderAccept): Promise<IAnswer<void>> {
        return this.ordersService.accept(dto);
    }

    // get one
    @UseGuards(EmployeesGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<IOrder>> {
        return this.ordersService.one(parseInt(id));
    }  
    
    // cancel
    @UseGuards(EmployeesGuard)
    @Post("cancel/:id")
    public cancel(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.ordersService.cancel(parseInt(id));
    }  

    // complete
    @UseGuards(EmployeesGuard)
    @Post("complete/:id")
    public complete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.ordersService.complete(parseInt(id));
    }  

    // update
    @UseGuards(EmployeesGuard)
    @Post("update")
    public update(@Body() dto: IOrderUpdate): Promise<IAnswer<void>> {
        return this.ordersService.update(dto);
    }

    // update
    @UseGuards(EmployeesGuard)
    @Post("create")
    public create(@Body() dto: IOrderCreate): Promise<IAnswer<void>> {
        return this.ordersService.create(dto);
    }
}
