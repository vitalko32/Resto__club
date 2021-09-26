import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './views/home/home.page';

const routes: Routes = [
	{path: "table/:table_code", component: HomePage},	
	{path: "**", redirectTo: "/table/null"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
