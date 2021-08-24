import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { AdminsService } from "./admins.service";
import { Admin } from "../../model/orm/admin.entity";
import { IAdminCreate } from "./dto/admin.create.interface";
import { IAdminUpdate } from "./dto/admin.update.interface";
import { IAdminLogin } from "./dto/admin.login.interface";
import { IAdminAuthData } from "./dto/admin.authdata.interface";

@Controller('api/admin/admins')
export class AdminsController {
    constructor (private adminsService: AdminsService) {}    

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Admin[]>> {
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
    public create(@Body() dto: IAdminCreate): Promise<IAnswer<void>> {
        return this.adminsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: IAdminUpdate): Promise<IAnswer<void>> {
        return this.adminsService.update(dto);
    }

    // authentication by email and password
    @Post("login")
    public login(@Body() dto: IAdminLogin): Promise<IAnswer<IAdminAuthData>> {                        
        return this.adminsService.login(dto);
    } 
}
