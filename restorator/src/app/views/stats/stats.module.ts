import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { StatESMComponent } from "./components/stat-esm/stat-esm.component";
import { StatSYComponent } from "./components/stat-sy/stat-sy.component";
import { StatTSMComponent } from "./components/stat-tsm/stat-tsm.component";
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
		StatTSMComponent,
		StatESMComponent,
		StatSYComponent,
	],    		    
})
export class StatsModule {}