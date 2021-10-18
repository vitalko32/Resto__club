import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { EmployeesGuard } from "src/common/guards/employees.guard";
import { StatsService } from "./stats.service";
import { IGetMonthStats } from "./dto/get.month.stats.interface";
import { ITableSum } from "./dto/table.sum.interface";
import { IEmployeeSum } from "./dto/employee.sum.interface";
import { IGetYearStats } from "./dto/get.year.stats.interface";

@Controller('api/restorator/stats')
export class StatsController {
    constructor (private statsService: StatsService) {}            

    // monthly income by tables
    @UseGuards(EmployeesGuard)
    @Post("table-sums-monthly")
    public tableSumsMonthly(@Body() dto: IGetMonthStats): Promise<IAnswer<ITableSum[]>> {
        return this.statsService.tableSumsMonthly(dto);
    }
    
    // monthly income by employees
    @UseGuards(EmployeesGuard)
    @Post("employee-sums-monthly")
    public employeesSumsMonthly(@Body() dto: IGetMonthStats): Promise<IAnswer<IEmployeeSum[]>> {
        return this.statsService.employeeSumsMonthly(dto);
    }

    // yearly income
    @UseGuards(EmployeesGuard)
    @Post("sums-yearly")
    public sumsYearly(@Body() dto: IGetYearStats): Promise<IAnswer<number[]>> {
        return this.statsService.sumsYearly(dto);
    }

    // yearly sales
    @UseGuards(EmployeesGuard)
    @Post("orders-yearly")
    public ordersYearly(@Body() dto: IGetYearStats): Promise<IAnswer<number[]>> {
        return this.statsService.ordersYearly(dto);
    }
}
