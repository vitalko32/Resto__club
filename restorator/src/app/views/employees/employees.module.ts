import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { IndexEmployeesPage } from "./index/index.employees.page";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexEmployeesPage, pathMatch: "full"},
	{path: "**", redirectTo: "/employees"},
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
		IndexEmployeesPage,
	],    		    
})
export class EmployeesModule {}