import { Component } from "@angular/core";
import { RestaurantsListPage } from "../restaurants.list.page";

@Component({
    selector: "active-restaurants-page",
    templateUrl: "../restaurants.list.page.html",   
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class ActiveRestaurantsPage extends RestaurantsListPage {
    public type: string = "active";
    public rlFilterActive: boolean = true;    
}