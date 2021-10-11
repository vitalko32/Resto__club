import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { WSServersService } from "./wsservers.service";
import { WSServer } from "../../model/orm/wsserver.entity";
import { IGetAll } from "src/model/dto/getall.interface";
import { EmployeesGuard } from "src/common/guards/employees.guard";

@Controller('api/restorator/wsservers')
export class WSServersController {
    constructor (private wsserversService: WSServersService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<WSServer[]>> {
        return this.wsserversService.all(dto);
    }       
}
