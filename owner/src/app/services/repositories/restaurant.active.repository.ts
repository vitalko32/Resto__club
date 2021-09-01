import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { RestaurantRepository } from './restaurant.repository';

@Injectable()
export class RestaurantActiveRepository extends RestaurantRepository {    
    constructor(protected dateService: DataService) {
        super(dateService);
        this.filterActive = true;
        this.filterActiveUntil = [null, null];
        this.filterName = "";
    }    
}
