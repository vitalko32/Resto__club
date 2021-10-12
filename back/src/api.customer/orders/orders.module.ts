import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { Order } from "src/model/orm/order.entity";
import { Table } from "src/model/orm/table.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,            
            Table,            
        ]),   
        CommonModule,
    ],    
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
