import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { IndexCatsPage } from "./index/index.cats.page";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexCatsPage, pathMatch: "full"},
	//{path: "create", component: CreateCatsPage, pathMatch: "full"},
	//{path: "edit/:id", component: EditCatsPage},
	{path: "**", redirectTo: "/kitchen/cats"},
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
		IndexCatsPage,		
	],    		    
})
export class CatsModule {}