import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Hall } from "src/model/orm/hall.entity";
import { jwtConstants } from "../../common/auth.constants";
import { HallsController } from "./halls.controller";
import { HallsService } from "./halls.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Hall]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [HallsService],
    controllers: [HallsController],
})
export class HallsModule {}
