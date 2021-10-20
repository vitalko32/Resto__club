import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { Employee } from "src/model/orm/employee.entity";
import { Lang } from "src/model/orm/lang.entity";
import { Order } from "src/model/orm/order.entity";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { jwtConstants } from "../../common/auth.constants";
import { ServingsModule } from "../servings/servings.module";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,            
            Employee,
            Lang,
            Wordbook,
        ]),
        JwtModule.register(jwtConstants),
        ServingsModule,
        CommonModule,
    ],    
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
