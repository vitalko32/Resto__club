import { Injectable } from '@angular/core';
import { EmployeeStatus } from '../../model/orm/employee.status.model';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository } from './_repository';

@Injectable()
export class EmployeeStatusRepository extends Repository<EmployeeStatus> {    
    constructor(protected dataService: DataService) {
        super();
        this.allSortBy = "pos";
    }
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy: this.allSortBy, sortDir: this.allSortDir};
            this.dataService.employeeStatusesAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new EmployeeStatus().build(d)) : [];                          
                    resolve();
                } else {                        
                    reject(res.statusCode+": "+res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    
}
