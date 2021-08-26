import { Injectable } from '@angular/core';

import { Restaurant } from '../../model/orm/restaurant.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { SimpleRepository } from './_simple.repository';

@Injectable()
export class RestaurantRepository extends SimpleRepository<Restaurant> {    
    public filterActive: boolean = false;
    
    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "created_at";
        this.sortDir = -1;
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            let filter: any = {active: this.filterActive};
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.sortBy,
                sortDir: this.sortDir, 
                filter,                               
            };
            this.dataService.restaurantsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xl = res.data.length ? res.data.map(d => new Restaurant().build(d)) : [];
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
    public loadOne(id: number): Promise<Restaurant> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Restaurant = new Restaurant().build(res.data);
                        resolve(x);
                    } else {
                        reject("Object not found");
                    }                    
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
            this.dataService.restaurantsDelete(id).subscribe(res => {
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

    public create(x: Restaurant): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsCreate(x).subscribe(res => {
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

    public update(x: Restaurant): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsUpdate(x).subscribe(res => {
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
