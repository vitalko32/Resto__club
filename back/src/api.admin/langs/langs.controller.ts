import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { LangsService } from "./langs.service";
import { Lang } from "../../model/orm/lang.entity";
import { ILangCreate } from "./dto/lang.create.interface";
import { ILangUpdate } from "./dto/lang.update.interface";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('api/admin/langs')
export class LangsController {
    constructor (private langsService: LangsService) {}    

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Lang[]>> {
        return this.langsService.all(dto);
    }  

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Lang[]>> {
        return this.langsService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Lang>> {
        return this.langsService.one(parseInt(id));
    }

    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.langsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AuthGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.langsService.deleteBulk(ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: ILangCreate): Promise<IAnswer<void>> {
        return this.langsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: ILangUpdate): Promise<IAnswer<void>> {
        return this.langsService.update(dto);
    }
}
