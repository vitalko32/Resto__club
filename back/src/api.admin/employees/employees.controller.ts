import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { EmployeesService } from "./employees.service";
import { Employee } from "../../model/orm/employee.entity";
import { IEmployeeUpdate } from "./dto/employee.update.interface";
import { IEmployeeCreate } from "./dto/employee.create.interface";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('api/admin/employees')
export class EmployeesController {
    constructor (private employeesService: EmployeesService) {}            

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Employee[]>> {
        return this.employeesService.all(dto);
    }  

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Employee[]>> {
        return this.employeesService.chunk(dto);
    }
    
    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Employee>> {
        return this.employeesService.one(parseInt(id));
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: IEmployeeCreate): Promise<IAnswer<void>> {
        return this.employeesService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: IEmployeeUpdate): Promise<IAnswer<void>> {
        return this.employeesService.update(dto);
    }
    
    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.employeesService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AuthGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.employeesService.deleteBulk(ids);
    }
}
