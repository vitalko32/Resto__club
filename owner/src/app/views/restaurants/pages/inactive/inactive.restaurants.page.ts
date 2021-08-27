import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { RestaurantInactiveRepository } from "src/app/services/repositories/restaurant.inactive.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { RestaurantsListPage } from "../restaurants.list.page";

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
        protected restaurantRepository: RestaurantInactiveRepository,
    ) {
        super(appService, wordRepository, restaurantRepository);
    }
}