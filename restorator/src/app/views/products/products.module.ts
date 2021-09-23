import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
//import { ProductComponent } from "./components/product/product.component";
//import { CreateProductsPage } from "./pages/create/create.products.page";
//import { EditProductsPage } from "./pages/edit/edit.products.page";
import { IndexProductsPage } from "./pages/index/index.products.page";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexProductsPage, pathMatch: "full"},
//	{path: "create", component: CreateProductsPage, pathMatch: "full"},
//	{path: "edit/:id", component: EditProductsPage},
	{path: "**", redirectTo: "/kitchen/products"},
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
		IndexProductsPage,		
//		CreateProductsPage,
//		EditProductsPage,
//		ProductComponent,
	],    		    
})
export class ProductsModule {}