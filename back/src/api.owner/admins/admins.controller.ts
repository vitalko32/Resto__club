import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/auth.guard";
import { IAnswer } from "src/model/answer.interface";
import { AdminsService } from "./admins.service";
import { IAdminAuthData } from "./dto/admin.authdata.interface";
import { IAdminGoogleData } from "./dto/admin.googledata.interface";
import { IAdminLogin } from "./dto/admin.login.interface";

@Controller('api/owner/admins')
export class AdminsController {
    constructor (private adminsService: AdminsService) {}        

    // authentication by google data
    @Post("login-with-google")
    public loginWithGoogle(@Body() dto: IAdminGoogleData): Promise<IAnswer<IAdminAuthData>> {                        
        return this.adminsService.loginWithGoogle(dto);
    }    
    
    // authentication by email and password
    @Post("login")
    public login(@Body() dto: IAdminLogin): Promise<IAnswer<IAdminAuthData>> {                        
        return this.adminsService.login(dto);
    }
}
