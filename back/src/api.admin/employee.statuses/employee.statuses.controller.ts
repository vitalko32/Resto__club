import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { EmployeeStatusesService } from "./employee.statuses.service";
import { EmployeeStatus } from "../../model/orm/employee.status.entity";
import { IEmployeeStatusUpdate } from "./dto/employee.status.update.interface";
import { IEmployeeStatusCreate } from "./dto/employee.status.create.interface";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('api/admin/employee-statuses')
export class EmployeeStatusesController {
    constructor (private employeeStatusesService: EmployeeStatusesService) {}            

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<EmployeeStatus[]>> {
        return this.employeeStatusesService.all(dto);
    }  

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<EmployeeStatus[]>> {
        return this.employeeStatusesService.chunk(dto);
    }
    
    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<EmployeeStatus>> {
        return this.employeeStatusesService.one(parseInt(id));
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: IEmployeeStatusCreate): Promise<IAnswer<void>> {
        return this.employeeStatusesService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: IEmployeeStatusUpdate): Promise<IAnswer<void>> {
        return this.employeeStatusesService.update(dto);
    }
    
    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.employeeStatusesService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AuthGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.employeeStatusesService.deleteBulk(ids);
    }
}
