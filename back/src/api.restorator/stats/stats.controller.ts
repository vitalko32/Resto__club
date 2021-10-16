import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { EmployeesGuard } from "src/common/guards/employees.guard";
import { StatsService } from "./stats.service";
import { IGetMonthStats } from "./dto/get.month.stats.interface";
import { ITableSum } from "./dto/table.sum.interface";

@Controller('api/restorator/stats')
export class StatsController {
    constructor (private statsService: StatsService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("tables")
    public tables(@Body() dto: IGetMonthStats): Promise<IAnswer<ITableSum[]>> {
        return this.statsService.tables(dto);
    }    
}
