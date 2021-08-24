import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { WordbooksService } from "./wordbooks.service";
import { Wordbook } from "../../model/orm/wordbook.entity";
import { IWordbookUpdate } from "./dto/wordbook.update.interface";
import { IWordbookCreate } from "./dto/wordbook.create.interface";

@Controller('api/admin/wordbooks')
export class WordbooksController {
    constructor (private wordbooksService: WordbooksService) {}        

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Wordbook[]>> {
        return this.wordbooksService.chunk(dto);
    }
    
    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Wordbook>> {
        return this.wordbooksService.one(parseInt(id));
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: IWordbookCreate): Promise<IAnswer<void>> {
        return this.wordbooksService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: IWordbookUpdate): Promise<IAnswer<void>> {
        return this.wordbooksService.update(dto);
    }
    
    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.wordbooksService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AuthGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.wordbooksService.deleteBulk(ids);
    }    
}
