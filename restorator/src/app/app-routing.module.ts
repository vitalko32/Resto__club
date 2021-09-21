import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';
import { AuthModule } from './views/auth/auth.module';
import { EmployeesModule } from './views/employees/employees.module';
import { HallsModule } from './views/halls/halls.module';
import { HomePage } from './views/home/home.page';
import { TablesModule } from './views/tables/tables.module';

const routes: Routes = [
	{path: "", component: HomePage, pathMatch: "full", canActivate: [AuthGuard]},
	{path: "auth", loadChildren: () => AuthModule}, 		
	{path: "employees", loadChildren: () => EmployeesModule, canActivate: [AuthGuard, AdminGuard]}, 		
	{path: "halls-tables/halls", loadChildren: () => HallsModule, canActivate: [AuthGuard, AdminGuard]}, 		
	{path: "halls-tables/tables", loadChildren: () => TablesModule, canActivate: [AuthGuard, AdminGuard]}, 		
	{path: "**", redirectTo: "/"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
