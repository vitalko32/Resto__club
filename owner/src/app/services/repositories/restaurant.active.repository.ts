import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { RestaurantRepository } from './restaurant.repository';

@Injectable()
export class RestaurantActiveRepository extends RestaurantRepository {    
    constructor(protected dataService: DataService) {
        super(dataService);
        this.filterActive = true;        
        this.filterName = "";      
        this.filterDaysleft = "";
    }    
}
