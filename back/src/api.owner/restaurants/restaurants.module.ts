import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";

import { Restaurant } from "src/model/orm/restaurant.entity";
import { jwtConstants } from "../../common/auth.constants";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Restaurant,
            Employee,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [RestaurantsService],
    controllers: [RestaurantsController],
})
export class RestaurantsModule {}
