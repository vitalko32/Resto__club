import { Controller, Post, Body } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { WSServersService } from "./wsservers.service";
import { WSServer } from "../../model/orm/wsserver.entity";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('api/restorator/wsservers')
export class WSServersController {
    constructor (private wsserversService: WSServersService) {}            

    // get all    
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<WSServer[]>> {
        return this.wsserversService.all(dto);
    }       
}
