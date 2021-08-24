import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsModule } from './views/restaurants/restaurants.module';

const routes: Routes = [
	{path: "", redirectTo: "/restaurants/active", pathMatch: "full"},
	//{path: "auth", loadChildren: () => AuthModule}, 	
	{path: "restaurants", loadChildren: () => RestaurantsModule}, 	
	{path: "**", redirectTo: "/restaurants/active"},
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
