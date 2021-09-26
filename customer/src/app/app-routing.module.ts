import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatModule } from './views/cat/cat.module';
import { ErrorsModule } from './views/errors/errors.module';
import { HomePage } from './views/home/home.page';

const routes: Routes = [
	{path: "table/:table_code", component: HomePage},	
	{path: "table/:table_code/cat", loadChildren: () => CatModule},	
	{path: "table/:table_code/error", loadChildren: () => ErrorsModule},	
	{path: "**", redirectTo: "/table/null"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
