import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/auth.guard";
import { IAnswer } from "../../model/answer.interface";
import { EmployeeStatusesService } from "./employee.statuses.service";
import { EmployeeStatus } from "../../model/orm/employee.status.entity";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('api/restorator/employee-statuses')
export class EmployeeStatusesController {
    constructor (private employeeStatusesService: EmployeeStatusesService) {}            

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<EmployeeStatus[]>> {
        return this.employeeStatusesService.all(dto);
    }      
}
