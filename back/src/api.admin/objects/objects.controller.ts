import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ObjectsService } from "./objects.service";
import { IUpdateParam } from "./dto/updateparam.interface";
import { IAnswer } from "../../model/answer.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('api/admin/objects')
export class ObjectsController {
    constructor (private objectsService: ObjectsService) {}

    // update parameter of any object    
    @UseGuards(AdminsGuard)
    @Post("update-param")    
    public updateParam (@Body() dto: IUpdateParam): Promise<IAnswer<void>> {
        return this.objectsService.updateParam(dto);
    }

    // update "egoistic" parameter of any object ("egoistic" means that only one can be true in table)   
    @UseGuards(AdminsGuard)
    @Post("update-egoistic-param")    
    public updateEgoisticParam (@Body() dto: IUpdateParam): Promise<IAnswer<void>> {
        return this.objectsService.updateEgoisticParam(dto);
    }   
}
