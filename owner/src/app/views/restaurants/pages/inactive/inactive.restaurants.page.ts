import { Component } from "@angular/core";
import { RestaurantsListPage } from "../restaurants.list.page";

@Component({
    selector: "inactive-restaurants-page",
    templateUrl: "../restaurants.list.page.html",   
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class InactiveRestaurantsPage extends RestaurantsListPage {
    public type: string = "inactive";
    public rlFilterActive: boolean = false;    
}