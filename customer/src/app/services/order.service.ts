import { Injectable } from "@angular/core";
import { ITable } from "../model/orm/table.interface";
import { DataService } from "./data.service";

@Injectable()
export class OrderService {
    public table: ITable = null;

    constructor(private dataService: DataService) {}

    public async init(code: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.tablesOne(code).subscribe(res => {
                res.statusCode === 200 ? this.table = res.data : null;
                resolve(res.statusCode);
            }, err => {
                reject(err.message);
            });
        });
    }
}