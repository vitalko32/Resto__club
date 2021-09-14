import { Injectable } from '@angular/core';

import { Lang } from '../../model/orm/lang.model';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository } from './_repository';

@Injectable()
export class LangRepository extends Repository<Lang> {    
    constructor(protected dataService: DataService) {
        super();
        this.allSortBy = "pos";
    }
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy: this.allSortBy, sortDir: this.allSortDir};
            this.dataService.langsAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Lang().build(d)) : [];                          
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
