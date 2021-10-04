import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { Order, OrderStatus } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class OrderMyRepository extends Repository<Order> {    
    public filterEmployeeId: number = null;
    
    constructor(protected dataService: DataService) {
        super(dataService);
        this.schema = "order";            
        this.allSortBy = "created_at";                
        this.allSortDir = -1;
    }    

    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetChunk = {                
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,        
                filter: {                    
                    status: OrderStatus.Active,
                    employee_id: this.filterEmployeeId,
                },
            };
            this.dataService.ordersAll(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xlAll = res.data.length ? res.data.map(d => new Order().build(d)) : [];      
                    resolve();
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }    

    public loadOne(id: number): Promise<Order> {
        return new Promise((resolve, reject) => this.dataService.ordersOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Order().build(res.data)) : reject(res.error), err => reject(err.message)));
    }   
    
    public complete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersComplete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.data), err => reject(err.message)));
    }

    public update(x: Order): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersUpdate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }
}
