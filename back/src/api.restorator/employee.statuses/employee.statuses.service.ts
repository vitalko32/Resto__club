import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from "src/model/answer.interface";
import { APIService } from "../../common/api.service";
import { EmployeeStatus } from "../../model/orm/employee.status.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";

@Injectable()
export class EmployeeStatusesService extends APIService {
    constructor (@InjectRepository(EmployeeStatus) private employeeStatusRepository: Repository<EmployeeStatus>) {
        super();
    }      
    
    public async all(dto: IGetAll): Promise<IAnswer<EmployeeStatus[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: EmployeeStatus[] = await this.employeeStatusRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["translations"]});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
