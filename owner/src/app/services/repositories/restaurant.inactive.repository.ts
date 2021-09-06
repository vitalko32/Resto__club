import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { RestaurantRepository } from './restaurant.repository';

@Injectable()
export class RestaurantInactiveRepository extends RestaurantRepository {    
    constructor(protected dateService: DataService) {
        super(dateService);
        this.filterActive = false;        
        this.filterName = "";
        this.filterDaysleft = "";
    }    
}
