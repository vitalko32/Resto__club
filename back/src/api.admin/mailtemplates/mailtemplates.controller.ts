import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { MailtemplatesService } from "./mailtemplates.service";
import { Mailtemplate } from "../../model/orm/mailtemplate.entity";
import { IMailtemplateUpdate } from "./dto/mailtemplate.update.interface";
import { IMailtemplateCreate } from "./dto/mailtemplate.create.interface";

@Controller('api/admin/mailtemplates')
export class MailtemplatesController {
    constructor (private mailtemplatesService: MailtemplatesService) {}            

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Mailtemplate[]>> {
        return this.mailtemplatesService.chunk(dto);
    }
    
    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Mailtemplate>> {
        return this.mailtemplatesService.one(parseInt(id));
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: IMailtemplateCreate): Promise<IAnswer<void>> {
        return this.mailtemplatesService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: IMailtemplateUpdate): Promise<IAnswer<void>> {
        return this.mailtemplatesService.update(dto);
    }
    
    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.mailtemplatesService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AuthGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.mailtemplatesService.deleteBulk(ids);
    }
}
