import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { InactiveRestaurantsView } from "./inactive/inactive.restaurants.view";
import { IndexRestaurantsView } from "./index/index.restaurants.view";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexRestaurantsView, pathMatch: "full"},
	{path: "inactive", component: InactiveRestaurantsView, pathMatch: "full"},
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
		IndexRestaurantsView,
		InactiveRestaurantsView,
	],    		    
})
export class RestaurantsModule {}