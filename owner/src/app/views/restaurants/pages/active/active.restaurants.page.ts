import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { RestaurantActiveRepository } from "src/app/services/repositories/restaurant.active.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { RestaurantsListPage } from "../restaurants.list.page";

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
        protected restaurantRepository: RestaurantActiveRepository,
    ) {
        super(appService, wordRepository, restaurantRepository);
    }
}