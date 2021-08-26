import { Component, Input } from '@angular/core';
import { Currency } from 'src/app/model/orm/currency.model';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-restaurant",
    templateUrl: "./restaurant.component.html"
})
export class RestaurantComponent extends ObjectComponent<Restaurant> {        
    @Input() cl: Currency[] = [];    
}
