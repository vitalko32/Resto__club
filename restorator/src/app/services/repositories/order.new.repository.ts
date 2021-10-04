import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { Order } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IOrderAccept } from 'src/app/model/dto/order.accept.interface';

@Injectable()
export class OrderNewRepository extends Repository<Order> {    
    public filterRestaurantId: number = null;
    
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
                filter: {restaurant_id: this.filterRestaurantId},
            };
            this.dataService.ordersAllNew(dto).subscribe(res => {
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
    
    public accept(order_id: number, employee_id: number, employee_comment: string = ""): Promise<number> {
        return new Promise((resolve, reject) => {
            const dto: IOrderAccept = {order_id, employee_id, employee_comment};
            this.dataService.ordersAccept(dto).subscribe(res => resolve(res.statusCode), err => reject(err.message));
        });
    }

    public loadOne(id: number): Promise<Order> {
        return new Promise((resolve, reject) => this.dataService.ordersOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Order().build(res.data)) : reject(res.error), err => reject(err.message)));
    }    
}
