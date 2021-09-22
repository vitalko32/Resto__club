import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Cat } from '../../model/orm/cat.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class CatRepository extends Repository<Cat> {
    public filterRestaurantId: number = null;    
    
    constructor(protected dataService: DataService) {
        super(dataService);
        this.schema = "cat";
        this.allSortBy = "pos";
        this.chunkSortBy = "pos";
    }        
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {    
            let filter: any = {};
            this.filterRestaurantId ? filter.restaurant_id = this.filterRestaurantId : null;        
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,
                filter,                    
            };
            this.dataService.catsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Cat().build(d)) : [];                                    
                    resolve();
                } else {                        
                    reject(res.error);
                }
            }, err => {
                reject(err.message);                
            });                        
        });
    }

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            let filter: any = {};
            this.filterRestaurantId ? filter.restaurant_id = this.filterRestaurantId : null;
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,        
                filter,                        
            };
            this.dataService.catsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xlChunk = res.data.length ? res.data.map(d => new Cat().build(d)) : [];
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

    public loadOne(id: number): Promise<Cat> {
        return new Promise((resolve, reject) => this.dataService.catsOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Cat().build(res.data)) : reject(res.error), err => reject(err.message)));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.catsDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }    

    public create(x: Cat): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.catsCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public update(x: Cat): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.catsUpdate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }
}
