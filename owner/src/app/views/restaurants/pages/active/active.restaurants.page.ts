import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { RestaurantRepository } from "src/app/services/repositories/restaurant.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { RestaurantsListPage } from "../restaurants.list.page";
import { ActiveRestaurantsService } from "./active.restaurants.service";

@Component({
    selector: "active-restaurants-page",
    templateUrl: "../restaurants.list.page.html",   
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class ActiveRestaurantsPage extends RestaurantsListPage {
    public type: string = "active";
    
    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,
        protected restaurantRepository: RestaurantRepository,
        protected listService: ActiveRestaurantsService,
    ) {
        super(appService, wordRepository, restaurantRepository, listService);
    }
}