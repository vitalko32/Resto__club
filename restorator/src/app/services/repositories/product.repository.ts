import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { Product } from '../../model/orm/product.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class ProductRepository extends Repository<Product> {    
    public filterCatId: number = null;    
    public filterNameCode: string = "";    
    
    constructor(protected dataService: DataService) {
        super(dataService);
        this.schema = "product";            
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
                filter: {cat_id: this.filterCatId, nameCode: this.filterNameCode},
            };
            this.dataService.productsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const data: Product[] =  res.data.length ? res.data.map(d => new Product().build(d)) : [];                      
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

    public loadOne(id: number): Promise<Product> {
        return new Promise((resolve, reject) => this.dataService.productsOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Product().build(res.data)) : reject(res.error), err => reject(err.message)));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.productsDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }    

    public create(x: Product): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.productsCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public update(x: Product): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.productsUpdate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }
}
