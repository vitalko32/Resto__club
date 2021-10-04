import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";
import { Lang } from "src/model/orm/lang.entity";
import { Order } from "src/model/orm/order.entity";
import { jwtConstants } from "../../common/auth.constants";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,            
            Employee,
            Lang,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
