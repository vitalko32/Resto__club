import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { AuthModule } from './views/auth/auth.module';
import { AdminsModule } from './views/admins/admins.module';
import { SettingsModule } from './views/settings/settings.module';
import { LangsModule } from './views/langs/langs.module';
import { WordbooksModule } from './views/wordbooks/wordbooks.module';
import { OptionsModule } from './views/options/options.module';
import { MailtemplatesModule } from './views/mailtemplates/mailtemplates.module';
import { CurrenciesModule } from './views/currencies/currencies.module';
import { EmployeeStatusesModule } from './views/employee.statuses/employee.statuses.module';
import { RestaurantsModule } from './views/restaurants/restaurants.module';
import { EmployeesModule } from './views/employees/employees.module';

const routes: Routes = [
	{path: "", redirectTo: "/settings", pathMatch: "full"},
	{path: "auth", loadChildren: () => AuthModule}, 	
	{path: "options", loadChildren: () => OptionsModule, canActivate: [AuthGuard]}, 	
	{path: "settings", loadChildren: () => SettingsModule, canActivate: [AuthGuard]}, 
	{path: "admins", loadChildren: () => AdminsModule, canActivate: [AuthGuard]}, 	
	{path: "localization/langs", loadChildren: () => LangsModule, canActivate: [AuthGuard]}, 	
	{path: "localization/wordbooks", loadChildren: () => WordbooksModule, canActivate: [AuthGuard]}, 				
	{path: "localization/currencies", loadChildren: () => CurrenciesModule, canActivate: [AuthGuard]}, 				
	{path: "restaurants/restaurants", loadChildren: () => RestaurantsModule, canActivate: [AuthGuard]}, 				
	{path: "restaurants/employees", loadChildren: () => EmployeesModule, canActivate: [AuthGuard]}, 				
	{path: "restaurants/employee-statuses", loadChildren: () => EmployeeStatusesModule, canActivate: [AuthGuard]}, 				
	{path: "utils/mailtemplates", loadChildren: () => MailtemplatesModule, canActivate: [AuthGuard]}, 		
	{path: "**", redirectTo: "/settings"},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),			
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
