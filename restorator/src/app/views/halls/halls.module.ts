import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { IndexHallsPage } from "./pages/index/index.halls.page";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexHallsPage, pathMatch: "full"},
	{path: "**", redirectTo: "/halls"},
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
		IndexHallsPage,
	],    		    
})
export class HallsModule {}