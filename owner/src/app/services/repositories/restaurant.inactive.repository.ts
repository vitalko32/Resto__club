import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { RestaurantRepository } from './restaurant.repository';

@Injectable()
export class RestaurantInactiveRepository extends RestaurantRepository {    
    constructor(protected dataService: DataService) {
        super(dataService);
        this.filterActive = false;        
        this.filterName = "";
        this.filterDaysleft = "";
    }    
}
