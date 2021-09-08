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
    public one(@Param("id") id: string): Promise<IAnswer<IEmployee>> {
        return this.employeesService.check(parseInt(id));
    }

    // set status
    @UseGuards(AuthGuard)
    @Post("set-status")
    public setStatus(@Body() dto: IEmployeeSetStatus): Promise<IAnswer<void>> {
        return this.employeesService.setStatus(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<IEmployee[]>> {
        return this.employeesService.chunk(dto);
    }  
}
