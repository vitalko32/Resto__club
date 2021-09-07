import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AuthModule } from './views/auth/auth.module';
import { HomePage } from './views/home/home.page';

const routes: Routes = [
	{path: "", component: HomePage, pathMatch: "full", canActivate: [AuthGuard]},
	{path: "auth", loadChildren: () => AuthModule}, 		
	{path: "**", redirectTo: "/"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
