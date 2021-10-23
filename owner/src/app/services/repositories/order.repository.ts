import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { Order } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class OrderRepository extends Repository<Order> {              
    public filterRestaurantId: number = null;    
    public filterCreatedAt: Date[] = [null, null];          
    
    constructor(protected dataService: DataService) {
        super();                
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
                    created_at: this.filterCreatedAt,                    
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
}
