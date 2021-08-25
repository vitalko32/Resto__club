import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { ActiveRestaurantsPage } from "./active/active.restaurants.page";
import { InactiveRestaurantsPage } from "./inactive/inactive.restaurants.page";

let routes = RouterModule.forChild ([            
	{path: "active", component: ActiveRestaurantsPage, pathMatch: "full"},
	{path: "inactive", component: InactiveRestaurantsPage, pathMatch: "full"},
	{path: "**", redirectTo: "/restaurants/active"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,
        
        routes,
		CCModule,
	],
	declarations: [
		ActiveRestaurantsPage,
		InactiveRestaurantsPage,
	],    		    
})
export class RestaurantsModule {}