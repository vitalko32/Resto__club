import { Injectable } from "@angular/core";
import { IGetChunk } from "src/app/model/dto/getchunk.interface";
import { Transaction } from "src/app/model/orm/transaction.model";
import { DataService } from "../data.service";
import { SimpleRepository } from "./_simple.repository";

@Injectable()
export class TransactionRepository extends SimpleRepository<Transaction> {
    public filterRestaurantId: number = null;  
    public filterCreatedAt: Date[] = [null, null];      

    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "created_at";
        this.sortDir = -1;
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            let filter: any = {restaurant_id: this.filterRestaurantId, created_at: this.filterCreatedAt};            
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.sortBy,
                sortDir: this.sortDir, 
                filter,                               
            };
            this.dataService.transactionsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xl = res.data.length ? res.data.map(d => new Transaction().build(d)) : [];
                    this.allLength = res.allLength;     
                    this.sum = res.sum;       
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