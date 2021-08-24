import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IndexRestaurantsView } from "./index/index.restaurants.view";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexRestaurantsView, pathMatch: "full"}	
]);

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,
        
        routes,
	],
	declarations: [
		IndexRestaurantsView,
	],    		    
})
export class RestaurantsModule {}