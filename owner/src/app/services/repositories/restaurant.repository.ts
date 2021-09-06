import { Injectable } from "@angular/core";
import { IGetChunk } from "src/app/model/dto/getchunk.interface";
import { IRestaurantRecharge } from "src/app/model/dto/restaurant.recharge.interface";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { DataService } from "../data.service";
import { SimpleRepository } from "./_simple.repository";

@Injectable()
export class RestaurantRepository extends SimpleRepository<Restaurant> {
    public filterActive: boolean;
    public filterName: string;
    public filterDaysleft: string;    

    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "created_at";
        this.sortDir = -1;
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            let filter: any = {active: this.filterActive, name: this.filterName, daysleft: this.filterDaysleft};
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

    public loadOne(id: number): Promise<Restaurant> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    let x: Restaurant = new Restaurant().build(res.data);
                    resolve(x);
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);                
            });
        });
    } 

    public create(x: Restaurant): Promise<number> {
        return new Promise((resolve, reject) => this.dataService.restaurantsCreate(x).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
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

    public recharge(dto: IRestaurantRecharge): Promise<number> {
        return new Promise((resolve, reject) => this.dataService.restaurantsRecharge(dto).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
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
}