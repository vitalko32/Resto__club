import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { IndexTablesPage } from "./pages/index/index.tables.page";
import { DragDropModule } from '@angular/cdk/drag-drop';

let routes = RouterModule.forChild ([            
	{path: "", component: IndexTablesPage, pathMatch: "full"},
	{path: "**", redirectTo: "/tables"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,
		DragDropModule,
        
        routes,
		CCModule,
	],
	declarations: [
		IndexTablesPage,		
	],    		    
})
export class TablesModule {}