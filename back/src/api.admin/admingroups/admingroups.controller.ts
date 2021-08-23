import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IAnswer } from "../../model/answer.interface";
import { IGetallDTO } from "../../model/dto/getall.dto";
import { AdmingroupsService } from "./admingroups.service";
import { Admingroup } from "../../model/orm/admingroup.entity";

@Controller('api/admin/admingroups')
export class AdmingroupsController {
    constructor (private admingroupsService: AdmingroupsService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetallDTO): Promise<IAnswer<Admingroup[]>> {
        return this.admingroupsService.all(dto);
    }    
}
