import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { IndexAllOrdersPage } from "./pages/all.index/index.all.orders.page";
import { ViewAllOrdersPage } from "./pages/all.view/view.all.orders.page";
import { IndexMyOrdersPage } from "./pages/my.index/index.my.orders.page";

let routes = RouterModule.forChild ([            
	{path: "all", component: IndexAllOrdersPage, pathMatch: "full"},
	{path: "all/view/:id", component: ViewAllOrdersPage},
	{path: "my", component: IndexMyOrdersPage, pathMatch: "full"},
	{path: "**", redirectTo: "/orders/all"},
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
		IndexAllOrdersPage,
		ViewAllOrdersPage,
		IndexMyOrdersPage,
	],    		    
})
export class OrdersModule {}