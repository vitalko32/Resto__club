import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { ActiveRestaurantsView } from "./active/active.restaurants.view";
import { InactiveRestaurantsView } from "./inactive/inactive.restaurants.view";

let routes = RouterModule.forChild ([            
	{path: "active", component: ActiveRestaurantsView, pathMatch: "full"},
	{path: "inactive", component: InactiveRestaurantsView, pathMatch: "full"},
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
		ActiveRestaurantsView,
		InactiveRestaurantsView,
	],    		    
})
export class RestaurantsModule {}