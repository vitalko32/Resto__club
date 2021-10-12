import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/model/orm/order.entity";
import { Table } from "src/model/orm/table.entity";
import { SocketModule } from "../socket/socket.module";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,            
            Table,            
        ]),   
        SocketModule,     
    ],    
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
