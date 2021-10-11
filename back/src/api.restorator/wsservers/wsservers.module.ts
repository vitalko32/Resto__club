import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import { jwtConstants } from "../../common/auth.constants";
import { WSServersController } from "./wsservers.controller";
import { WSServersService } from "./wsservers.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            WSServer,            
            Employee,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [WSServersService],
    controllers: [WSServersController],
})
export class WSServersModule {}
