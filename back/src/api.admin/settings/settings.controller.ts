import { Controller, Param, Post, Body, Delete, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetchunkDTO } from "../../model/dto/getchunk.dto";
import { IAnswer } from "../../model/answer.interface";
import { SettingsService } from "./settings.service";
import { Setting } from "src/model/orm/setting.entity";
import { ISettingCreateDTO } from "./dto/setting.create.dto";
import { IGetallDTO } from "src/model/dto/getall.dto";

@Controller('api/admin/settings')
export class SettingsController {
    constructor (private settingsService: SettingsService) {}
    
    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetallDTO): Promise<IAnswer<Setting[]>> {
        return this.settingsService.all(dto);
    } 

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetchunkDTO): Promise<IAnswer<Setting[]>> {
        return this.settingsService.chunk(dto);
    }
    
    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.settingsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AuthGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.settingsService.deleteBulk(ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: ISettingCreateDTO): Promise<IAnswer<void>> {
        return this.settingsService.create(dto);
    }
}
