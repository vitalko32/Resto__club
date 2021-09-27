import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IProduct } from 'src/app/model/orm/product.interface';

@Injectable()
export class ProductRepository extends Repository<IProduct> {        
    public filterCatId: number = null;        
    
    constructor(protected dataService: DataService) {
        super();        
        this.chunkSortBy = "pos";        
        this.chunkLength = 12;
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,        
                filter: {cat_id: this.filterCatId},
            };
            this.dataService.productsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const data: IProduct[] =  res.data;                      
                    this.xlAll = this.chunkCurrentPart ? [...this.xlAll, ...data] : data;
                    this.allLength = res.allLength;    
                    this.exhausted = !this.allLength || this.chunkCurrentPart + 1 === Math.ceil(this.allLength / this.chunkLength);          
                    resolve();
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }

    public loadOne(id: number): Promise<IProduct> {
        return new Promise((resolve, reject) => this.dataService.productsOne(id).subscribe(res => res.statusCode === 200 ? resolve(res.data) : reject(res.statusCode), err => reject(err.message)));
    }        
}
