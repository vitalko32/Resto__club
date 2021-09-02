import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { Admin } from "src/model/orm/admin.entity";
import { Employee } from "src/model/orm/employee.entity";

import { Restaurant } from "src/model/orm/restaurant.entity";
import { Transaction } from "src/model/orm/transaction.entity";
import { jwtConstants } from "../../common/auth.constants";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Restaurant,
            Employee,
            Admin,
            Transaction,
        ]),
        JwtModule.register(jwtConstants),
        CommonModule,
    ],    
    providers: [RestaurantsService],
    controllers: [RestaurantsController],
})
export class RestaurantsModule {}
