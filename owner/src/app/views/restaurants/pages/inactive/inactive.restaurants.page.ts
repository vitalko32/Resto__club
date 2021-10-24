import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { RestaurantRepository } from "src/app/services/repositories/restaurant.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { RestaurantsListPage } from "../restaurants.list.page";
import { InactiveRestaurantsService } from "./inactive.restaurants.service";

@Component({
    selector: "inactive-restaurants-page",
    templateUrl: "../restaurants.list.page.html",   
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class InactiveRestaurantsPage extends RestaurantsListPage {
    public type: string = "inactive";
    
    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,
        protected restaurantRepository: RestaurantRepository,
        protected listService: InactiveRestaurantsService,
    ) {
        super(appService, wordRepository, restaurantRepository, listService);
    }
}