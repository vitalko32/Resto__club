import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ObjectsService } from "./objects.service";
import { IUpdateParamDTO } from "./dto/updateparam.dto";
import { IAnswer } from "../../model/answer.interface";
import { AuthGuard } from "../../common/auth.guard";

@Controller('api/admin/objects')
export class ObjectsController {
    constructor (private objectsService: ObjectsService) {}

    // update parameter of any object    
    @UseGuards(AuthGuard)
    @Post("update-param")    
    public updateParam (@Body() dto: IUpdateParamDTO): Promise<IAnswer<void>> {
        return this.objectsService.updateParam(dto);
    }

    // update "egoistic" parameter of any object ("egoistic" means that only one can be true in table)   
    @UseGuards(AuthGuard)
    @Post("update-egoistic-param")    
    public updateEgoisticParam (@Body() dto: IUpdateParamDTO): Promise<IAnswer<void>> {
        return this.objectsService.updateEgoisticParam(dto);
    }   
}
