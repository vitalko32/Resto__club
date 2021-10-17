import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { StatEmployeesComponent } from "./components/stat-employees/stat-employees.component";
import { StatTablesComponent } from "./components/stat-tables/stat-tables.component";
import { IndexStatsPage } from "./pages/index.stats.page";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexStatsPage, pathMatch: "full"},	
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
		IndexStatsPage,		
		StatTablesComponent,	
		StatEmployeesComponent,	
	],    		    
})
export class StatsModule {}