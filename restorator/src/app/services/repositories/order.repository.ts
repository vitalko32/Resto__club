import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { Order, OrderStatus } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IOrderAccept } from 'src/app/model/dto/order.accept.interface';

@Injectable()
export class OrderRepository extends Repository<Order> {    
    public filterStatus: OrderStatus = null;
    public filterEmployeeId: number = null;
    public filterRestaurantId: number = null;
    
    constructor(protected dataService: DataService) {
        super(dataService);
        this.schema = "order";            
        this.allSortBy = "created_at";                
        this.allSortDir = -1;
    }    

    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const filter: any = {};
            this.filterStatus ? filter.status = this.filterStatus : null;
            this.filterEmployeeId ? filter.employee_id = this.filterEmployeeId : null;            
            this.filterRestaurantId ? filter.restaurant_id = this.filterRestaurantId : null;
            const dto: IGetChunk = {                
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,        
                filter,
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
    
    public accept(order_id: number, employee_id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IOrderAccept = {order_id, employee_id};
            this.dataService.ordersAccept(dto).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message));
        });
    }

    public loadOne(id: number): Promise<Order> {
        return new Promise((resolve, reject) => this.dataService.ordersOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Order().build(res.data)) : reject(res.error), err => reject(err.message)));
    }  
    
    /*
      

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }    

    public create(x: Order): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public update(x: Order): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersUpdate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }
    */
}
