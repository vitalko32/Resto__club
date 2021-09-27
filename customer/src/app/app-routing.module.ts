import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorsModule } from './views/errors/errors.module';
import { HomePage } from './views/home/home.page';
import { MenuModule } from './views/menu/menu.module';

const routes: Routes = [
	{path: "table/:table_code", component: HomePage},	
	{path: "table/:table_code/menu", loadChildren: () => MenuModule},	
	{path: "table/:table_code/error", loadChildren: () => ErrorsModule},	
	{path: "**", redirectTo: "/table/null"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
