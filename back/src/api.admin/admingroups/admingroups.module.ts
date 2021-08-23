import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Admingroup } from "../../model/orm/admingroup.entity";
import { jwtConstants } from "../../common/auth.constants";
import { AdmingroupsService } from "./admingroups.service";
import { AdmingroupsController } from "./admingroups.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Admingroup]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [AdmingroupsService],
    controllers: [AdmingroupsController],
})
export class AdmingroupsModule {}
