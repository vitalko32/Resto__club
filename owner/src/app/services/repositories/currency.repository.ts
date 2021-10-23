import { Injectable } from '@angular/core';

import { Currency } from '../../model/orm/currency.model';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository } from './_repository';

@Injectable()
export class CurrencyRepository extends Repository {    
    constructor(protected dataService: DataService) {
        super();
        this.allSortBy = "pos";
    }
    
    public loadAll(): Promise<Currency[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy: this.allSortBy, sortDir: this.allSortDir};
            this.dataService.currenciesAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {                    
                    resolve(res.data.map(d => new Currency().build(d)));
                } else {                        
                    reject(res.statusCode+": "+res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    
}
