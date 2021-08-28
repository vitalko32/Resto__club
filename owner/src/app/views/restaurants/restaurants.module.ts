import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { ActiveRestaurantsPage } from "./pages/active/active.restaurants.page";
import { CreateRestaurantsPage } from "./pages/create/create.restaurants.page";
import { EditRestaurantsPage } from "./pages/edit/edit.restaurants.page";
import { InactiveRestaurantsPage } from "./pages/inactive/inactive.restaurants.page";

let routes = RouterModule.forChild ([            
	{path: "active", component: ActiveRestaurantsPage, pathMatch: "full"},
	{path: "inactive", component: InactiveRestaurantsPage, pathMatch: "full"},
	{path: "create", component: CreateRestaurantsPage, pathMatch: "full"},
	{path: ":type/edit/:id", component: EditRestaurantsPage},
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
		CreateRestaurantsPage,
		EditRestaurantsPage,
		RestaurantComponent,
	],    		    
})
export class RestaurantsModule {}