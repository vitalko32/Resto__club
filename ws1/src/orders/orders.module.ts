import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersGateway } from "./orders.gateway";
import { OrdersService } from "./orders.service";

@Module({
    imports: [],    
    providers: [
        OrdersService,
        OrdersGateway,
    ],
    controllers: [OrdersController],
})
export class OrdersModule {}
