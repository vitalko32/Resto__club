import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import { jwtConstants } from "../../common/auth.constants";
import { WSServersController } from "./wsservers.controller";
import { WSServersService } from "./wsservers.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            WSServer,            
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [WSServersService],
    controllers: [WSServersController],
})
export class WSServersModule {}
