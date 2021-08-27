import { Injectable } from '@angular/core';

import { Currency } from '../../model/orm/currency.model';
import { DataService } from '../data.service';
import { SimpleRepository } from './_simple.repository';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class CurrencyRepository extends SimpleRepository<Currency> {    
    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "pos";
    }
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy: this.sortBy, sortDir: this.sortDir};
            this.dataService.currenciesAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {
                    this.xl = res.data.length ? res.data.map(d => new Currency().build(d)) : [];                          
                    resolve();
                } else {                        
                    reject(res.statusCode+": "+res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    
}
