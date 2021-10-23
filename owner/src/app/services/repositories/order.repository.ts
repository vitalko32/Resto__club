import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { Order } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IChunk } from 'src/app/model/chunk.interface';

@Injectable()
export class OrderRepository extends Repository {              
    constructor(protected dataService: DataService) {
        super();                
        this.chunkSortBy = "created_at";
        this.chunkSortDir = -1;
    }    

    public loadChunk(part: number, filter: any = {}): Promise<IChunk<Order>> {
        return new Promise((resolve, reject) => {                        
            const dto: IGetChunk = {
                from: part * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,        
                filter,
            };
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
}
