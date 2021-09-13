import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { IndexTablesPage } from "./pages/index/index.tables.page";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexTablesPage, pathMatch: "full"},
	{path: "**", redirectTo: "/tables"},
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
		IndexTablesPage,		
	],    		    
})
export class TablesModule {}