import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Restaurant } from "src/model/orm/restaurant.entity";
import { jwtConstants } from "../../common/auth.constants";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Restaurant]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [RestaurantsService],
    controllers: [RestaurantsController],
})
export class RestaurantsModule {}
