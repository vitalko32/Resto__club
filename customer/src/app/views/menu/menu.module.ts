import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CatPage } from "./cat/cat.page";

let routes = RouterModule.forChild ([            
	{path: ":cat_id", component: CatPage},	
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
export class MenuModule {}