import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { OrderProductEditableComponent } from "./components/order-product-editable/order-product-editable.component";
import { OrderProductComponent } from "./components/order-product/order-product.component";
import { OrderComponent } from "./components/order/order.component";
import { ProductFinderComponent } from "./components/product-finder/product-finder.component";
import { EditAllOrdersPage } from "./pages/all.edit/edit.all.orders.page";
import { IndexAllOrdersPage } from "./pages/all.index/index.all.orders.page";
import { CreateMyOrdersPage } from "./pages/my.create/create.my.orders.page";
import { EditMyOrdersPage } from "./pages/my.edit/edit.my.orders.page";
import { IndexMyOrdersPage } from "./pages/my.index/index.my.orders.page";
import { IndexNewOrdersPage } from "./pages/new.index/index.new.orders.page";
import { ViewNewOrdersPage } from "./pages/new.view/view.new.orders.page";

let routes = RouterModule.forChild ([            
	{path: "new", component: IndexNewOrdersPage, pathMatch: "full"},
	{path: "new/view/:id", component: ViewNewOrdersPage},
	{path: "my", component: IndexMyOrdersPage, pathMatch: "full"},
	{path: "my/edit/:id", component: EditMyOrdersPage},
	{path: "my/create", component: CreateMyOrdersPage},
	{path: "all", component: IndexAllOrdersPage, pathMatch: "full"},
	{path: "all/edit/:id", component: EditAllOrdersPage},
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
		IndexNewOrdersPage,
		IndexMyOrdersPage,
		ViewNewOrdersPage,
		EditMyOrdersPage,
		CreateMyOrdersPage,
		IndexAllOrdersPage,
		EditAllOrdersPage,
		OrderComponent,
		OrderProductComponent,	
		OrderProductEditableComponent,	
		ProductFinderComponent,
	],    		    
})
export class OrdersModule {}