import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { CatMenuPage } from "./cat/cat.menu.page";
import { ProductMenuPage } from "./product/product.menu.page";

let routes = RouterModule.forChild ([            
	{path: ":cat_id", component: CatMenuPage},	
	{path: ":cat_id/:product_id", component: ProductMenuPage},	
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
		CatMenuPage,
		ProductMenuPage,
	],    		    
})
export class MenuModule {}