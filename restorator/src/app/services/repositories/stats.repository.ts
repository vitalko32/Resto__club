import { Injectable } from "@angular/core";
import { IEmployeeSum } from "src/app/model/dto/stats/employee.sum.interface";
import { IGetMonthStats } from "src/app/model/dto/stats/get.month.stats.interface";
import { ITableSum } from "src/app/model/dto/stats/table.sum.interface";
import { DataService } from "../data.service";

@Injectable()
export class StatsRepository {
    constructor(private dataService: DataService) {}

    public loadTables(restaurant_id: number, month: number, year: number): Promise<ITableSum[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetMonthStats = {restaurant_id, month, year};
            this.dataService
                .statsTables(dto)
                .subscribe(
                    res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    err => reject(err.message));
        });
    }

    public loadEmployees(restaurant_id: number, month: number, year: number): Promise<IEmployeeSum[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetMonthStats = {restaurant_id, month, year};
            this.dataService
                .statsEmployees(dto)
                .subscribe(
                    res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    err => reject(err.message));
        });
    }
}