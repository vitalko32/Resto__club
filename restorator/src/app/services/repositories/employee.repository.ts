import { Injectable } from "@angular/core";
import { IGetChunk } from "src/app/model/dto/getchunk.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { DataService } from "../data.service";
import { SimpleRepository } from "./_simple.repository";

@Injectable()
export class EmployeeRepository extends SimpleRepository<Employee> {    
    public filterRestaurantId = null;
    public filterName: string = "";
    public filterCreatedAt: Date[] = [null, null];         

    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "created_at";
        this.sortDir = -1;
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            let filter: any = {name: this.filterName, created_at: this.filterCreatedAt, restaurant_id: this.filterRestaurantId};
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.sortBy,
                sortDir: this.sortDir, 
                filter,                               
            };
            this.dataService.employeesChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xl = res.data.length ? res.data.map(d => new Employee().build(d)) : [];
                    this.allLength = res.allLength;            
                    resolve();
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }    

    /*
    public loadOne(id: number): Promise<Employee> {
        return new Promise((resolve, reject) => {
            this.dataService.employeesOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    let x: Employee = new Employee().build(res.data);
                    resolve(x);
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);                
            });
        });
    } 

    public create(x: Employee): Promise<number> {
        return new Promise((resolve, reject) => this.dataService.employeesCreate(x).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
    }

    public update(x: Employee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.employeesUpdate(x).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    
    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.employeesDelete(id).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);                
            });
        });
    } 
    */
}