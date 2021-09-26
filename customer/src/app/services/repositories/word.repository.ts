import { Injectable } from '@angular/core';

import { Words } from 'src/app/model/orm/words.type';
import { DataService } from '../data.service';

@Injectable()
export class WordRepository {
    public restaurant_id: number = null;
    public words: Words = null;
    
    constructor(protected dataService: DataService) {}
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            this.dataService.wordsAll(this.restaurant_id).subscribe(res => {                    
                if (res.statusCode === 200) {                    
                    this.words = res.data;
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
