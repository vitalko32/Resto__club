import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/auth.guard";
import { IAnswer } from "src/model/answer.interface";
import { AdminsService } from "./admins.service";
import { IAdminAuthData } from "./dto/admin.authdata.interface";
import { IAdminLogin } from "./dto/admin.login.interface";
import { IAdminLoginByEmail } from "./dto/admin.loginbyemail.interface";
import { IAdminUpdatePassword } from "./dto/admin.updatepassword.interface";

@Controller('api/owner/admins')
export class AdminsController {
    constructor (private adminsService: AdminsService) {}        

    // authentication by email only (for google, apple etc.)
    @Post("login-by-email")
    public loginByEmail(@Body() dto: IAdminLoginByEmail): Promise<IAnswer<IAdminAuthData>> {                        
        return this.adminsService.loginByEmail(dto);
    }    
    
    // authentication by email and password
    @Post("login")
    public login(@Body() dto: IAdminLogin): Promise<IAnswer<IAdminAuthData>> {                        
        return this.adminsService.login(dto);
    }

    // update password
    @UseGuards(AuthGuard)
    @Post("update-password")
    public updatePassword(@Body() dto: IAdminUpdatePassword): Promise<IAnswer<void>> {
        return this.adminsService.updatePassword(dto);
    }
}
