import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetchunkDTO } from "../../model/dto/getchunk.dto";
import { IAnswer } from "../../model/answer.interface";
import { LangsService } from "./langs.service";
import { Lang } from "../../model/orm/lang.entity";
import { ILangCreateDTO } from "./dto/lang.create.dto";
import { ILangUpdateDTO } from "./dto/lang.update.dto";
import { IGetallDTO } from "src/model/dto/getall.dto";

@Controller('api/admin/langs')
export class LangsController {
    constructor (private langsService: LangsService) {}    

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetallDTO): Promise<IAnswer<Lang[]>> {
        return this.langsService.all(dto);
    }  

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetchunkDTO): Promise<IAnswer<Lang[]>> {
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
    public create(@Body() dto: ILangCreateDTO): Promise<IAnswer<void>> {
        return this.langsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: ILangUpdateDTO): Promise<IAnswer<void>> {
        return this.langsService.update(dto);
    }
}
