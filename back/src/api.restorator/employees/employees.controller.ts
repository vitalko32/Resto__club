import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { IAnswer } from "src/model/answer.interface";
import { EmployeesService } from "./employees.service";
import { IEmployeeAuthData } from "./dto/employee.authdata.interface";
import { IEmployeeLogin } from "./dto/employee.login.interface";
import { IEmployeeLoginByEmail } from "./dto/employee.loginbyemail.interface";
import { AuthGuard } from "src/common/auth.guard";
import { IEmployee } from "./dto/employee.interface";
import { IEmployeeSetStatus } from "./dto/employee.setstatus.interface";
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { IEmployeeConfirm } from "./dto/employee.confirm.interface";
import { IEmployeeCreate } from "src/api.admin/employees/dto/employee.create.interface";
import { IEmployeeUpdate } from "src/api.admin/employees/dto/employee.update.interface";
import { IEmployeeUpdatePassword } from "./dto/employee.updatepassword.interface";

@Controller('api/restorator/employees')
export class EmployeesController {
    constructor (private employeesService: EmployeesService) {}                
    
    // authentication by email and password
    @Post("login")
    public login(@Body() dto: IEmployeeLogin): Promise<IAnswer<IEmployeeAuthData>> {                        
        return this.employeesService.login(dto);
    }    

    // authentication by email only (for google, apple etc.)
    @Post("login-by-email")
    public loginByEmail(@Body() dto: IEmployeeLoginByEmail): Promise<IAnswer<IEmployeeAuthData>> {                        
        return this.employeesService.loginByEmail(dto);
    }

    // check and reload
    @UseGuards(AuthGuard)
    @Post("check/:id")
    public check(@Param("id") id: string): Promise<IAnswer<IEmployee>> {
        return this.employeesService.check(parseInt(id));
    }

    // set status
    @UseGuards(AuthGuard)
    @Post("set-status")
    public setStatus(@Body() dto: IEmployeeSetStatus): Promise<IAnswer<void>> {
        return this.employeesService.setStatus(dto);
    }    

    // check pw and confirm
    @UseGuards(AuthGuard)
    @Post("confirm")
    public confirm(@Body() dto: IEmployeeConfirm): Promise<IAnswer<void>> {
        return this.employeesService.confirm(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<IEmployee[]>> {
        return this.employeesService.chunk(dto);
    }  

    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.employeesService.delete(parseInt(id));
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: IEmployeeCreate): Promise<IAnswer<void>> {
        return this.employeesService.create(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<IEmployee>> {
        return this.employeesService.one(parseInt(id));
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: IEmployeeUpdate): Promise<IAnswer<void>> {
        return this.employeesService.update(dto);
    }

    // update password
    @UseGuards(AuthGuard)
    @Post("update-password")
    public updatePassword(@Body() dto: IEmployeeUpdatePassword): Promise<IAnswer<void>> {
        return this.employeesService.updatePassword(dto);
    }
}
