import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetchunkDTO } from "../../model/dto/getchunk.dto";
import { IAnswer } from "../../model/answer.interface";
import { AdminsService } from "./admins.service";
import { Admin } from "../../model/orm/admin.entity";
import { IAdminCreateDTO } from "./dto/admin.create.dto";
import { IAdminUpdateDTO } from "./dto/admin.update.dto";
import { IAdminLoginDTO } from "./dto/admin.login.dto";
import { IAdminAuthDataDTO } from "./dto/admin.authdata.dto";

@Controller('api/admin/admins')
export class AdminsController {
    constructor (private adminsService: AdminsService) {}    

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetchunkDTO): Promise<IAnswer<Admin[]>> {
        return this.adminsService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Admin>> {
        return this.adminsService.one(parseInt(id));
    }

    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.adminsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AuthGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.adminsService.deleteBulk(ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: IAdminCreateDTO): Promise<IAnswer<void>> {
        return this.adminsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: IAdminUpdateDTO): Promise<IAnswer<void>> {
        return this.adminsService.update(dto);
    }

    // authentication by email and password
    @Post("login")
    public login(@Body() dto: IAdminLoginDTO): Promise<IAnswer<IAdminAuthDataDTO>> {                        
        return this.adminsService.login(dto);
    } 
}
