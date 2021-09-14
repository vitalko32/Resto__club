import { Injectable } from "@angular/core";
import { IGetChunk } from "src/app/model/dto/getchunk.interface";
import { Transaction, TransactionType } from "src/app/model/orm/transaction.model";
import { DataService } from "../data.service";
import { Repository } from "./_repository";

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
    public filterRestaurantId: number = null;  
    public filterCreatedAt: Date[] = [null, null];     
    public filterType: TransactionType = null; 

    constructor(protected dataService: DataService) {
        super();
        this.chunkSortBy = "created_at";
        this.chunkSortDir = -1;
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            let filter: any = {restaurant_id: this.filterRestaurantId, created_at: this.filterCreatedAt, type: this.filterType};            
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir, 
                filter,                               
            };
            this.dataService.transactionsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xlChunk = res.data.length ? res.data.map(d => new Transaction().build(d)) : [];
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