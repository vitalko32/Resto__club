import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository2 } from './_repository2';
import { IChunk } from 'src/app/model/chunk.interface';
import { IOrderAccept } from 'src/app/model/dto/order.accept.interface';

@Injectable()
export class OrderRepository extends Repository2 {    
    constructor(protected dataService: DataService) {
        super(dataService);        
        this.schema = "order";          
    }  
    
    public loadAll(sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): Promise<Order[]> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {sortBy, sortDir, filter};
            this.dataService.ordersAll(dto).subscribe(res => {
                if (res.statusCode === 200) {                                                            
                    resolve(res.data.map(d => new Order().build(d)));
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    } 

    public loadChunk(part: number, sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): Promise<IChunk<Order>> {
        return new Promise((resolve, reject) => {                        
            const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
            this.dataService.ordersChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const chunk: IChunk<Order> = {data: res.data.map(d => new Order().build(d)), allLength: res.allLength, sum: res.sum};
                    resolve(chunk);
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }  

    public export(lang_id: number, sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): void {
        const dto: IGetAll = {sortBy, sortDir, filter, lang_id};        
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

    public accept(order_id: number, employee_id: number, employee_comment: string = ""): Promise<number> {
        return new Promise((resolve, reject) => {
            const dto: IOrderAccept = {order_id, employee_id, employee_comment};
            this.dataService.ordersAccept(dto).subscribe(res => resolve(res.statusCode), err => reject(err.message));
        });
    }
}
