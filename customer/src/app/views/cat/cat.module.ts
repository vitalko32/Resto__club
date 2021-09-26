import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CatPage } from "./cat.page";

let routes = RouterModule.forChild ([            
	{path: ":id", component: CatPage},
	{path: "**", redirectTo: "/table/null"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,
        
        routes,		
	],
	declarations: [
		CatPage,
	],    		    
})
export class CatModule {}