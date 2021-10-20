import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { Order, OrderStatus } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class OrderRepository extends Repository<Order> {              
    public filterRestaurantId: number = null;    
    public filterHallId: number = null;    
    public filterTableId: number = null;    
    public filterEmployeeId: number = null;    
    public filterCreatedAt: Date[] = [null, null];      
    public filterStatus: OrderStatus = null;
    
    constructor(protected dataService: DataService) {
        super(dataService);        
        this.schema = "order";  
        this.chunkSortBy = "created_at";
        this.chunkSortDir = -1;
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {                        
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,        
                filter: {
                    restaurant_id: this.filterRestaurantId, 
                    hall_id: this.filterHallId,
                    table_id: this.filterTableId,
                    employee_id: this.filterEmployeeId,
                    created_at: this.filterCreatedAt,
                    status: this.filterStatus,
                }
            };
            this.dataService.ordersChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xlChunk = res.data.length ? res.data.map(d => new Order().build(d)) : [];
                    this.sum = res.sum;
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

    public export(lang_id: number): void {
        const dto: IGetAll = {
            sortBy: this.chunkSortBy,
            sortDir: this.chunkSortDir,        
            filter: {
                restaurant_id: this.filterRestaurantId, 
                hall_id: this.filterHallId,
                table_id: this.filterTableId,
                employee_id: this.filterEmployeeId,
                created_at: this.filterCreatedAt,
                status: this.filterStatus,                
            },
            lang_id,
        };
        this.dataService.ordersExport(dto);  
    }
    
    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    } 

    public complete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersComplete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.data), err => reject(err.message)));
    }

    public activate(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersActivate(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.data), err => reject(err.message)));
    }

    public loadOne(id: number): Promise<Order> {
        return new Promise((resolve, reject) => this.dataService.ordersOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Order().build(res.data)) : reject(res.error), err => reject(err.message)));
    }    
    
    public update(x: Order): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersUpdate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public create(x: Order): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public cancel(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersCancel(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.data), err => reject(err.message)));
    }
}
