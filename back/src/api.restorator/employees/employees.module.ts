import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { Setting } from "src/model/orm/setting.entity";
import { jwtConstants } from "../../common/auth.constants";
import { Employee } from "../../model/orm/employee.entity";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Employee,
            Setting,
            Restaurant,
        ]),
        JwtModule.register(jwtConstants),
        CommonModule,
    ],    
    providers: [EmployeesService],
    controllers: [EmployeesController],
})
export class EmployeesModule {}
