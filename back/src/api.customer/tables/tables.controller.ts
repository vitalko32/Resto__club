import { Controller, Param, Post } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { TablesService } from "./tables.service";
import { ITable } from "./dto/table.interface";

@Controller('api/customer/tables')
export class TablesController {
    constructor (private tablesService: TablesService) {}

    // delete one
    @Post("one/:code")
    public delete(@Param("code") code: string): Promise<IAnswer<ITable>> {
        return this.tablesService.one(code);
    }    
}
