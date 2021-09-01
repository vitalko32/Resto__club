import { Injectable } from '@angular/core';

import { Lang } from '../../model/orm/lang.model';
import { DataService } from '../data.service';
import { SimpleRepository } from './_simple.repository';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class LangRepository extends SimpleRepository<Lang> {    
    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "pos";
    }
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy: this.sortBy, sortDir: this.sortDir};
            this.dataService.langsAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {
                    this.xl = res.data.length ? res.data.map(d => new Lang().build(d)) : [];                          
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
