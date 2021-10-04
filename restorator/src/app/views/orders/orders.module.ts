import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { OrderProductComponent } from "./components/order-product/order-product.component";
import { EditMyOrdersPage } from "./pages/my.edit/edit.my.orders.page";
import { MyOrdersPage } from "./pages/my/my.orders.page";
import { ViewNewOrdersPage } from "./pages/new.view/view.new.orders.page";
import { NewOrdersPage } from "./pages/new/new.orders.page";

let routes = RouterModule.forChild ([            
	{path: "new", component: NewOrdersPage, pathMatch: "full"},
	{path: "new/view/:id", component: ViewNewOrdersPage},
	{path: "my", component: MyOrdersPage, pathMatch: "full"},
	{path: "my/edit/:id", component: EditMyOrdersPage},
	{path: "**", redirectTo: "/orders/new"},
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
		NewOrdersPage,
		MyOrdersPage,
		ViewNewOrdersPage,
		EditMyOrdersPage,
		OrderProductComponent,
	],    		    
})
export class OrdersModule {}