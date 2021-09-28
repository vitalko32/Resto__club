import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICat } from "src/app/model/orm/cat.interface";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { ProductRepository } from "src/app/services/repositories/product.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { ProductListMenuPage } from "../product-list/product-list.menu.page";

@Component({
    selector: "recommended-menu-page",
    templateUrl: "product-list.menu.page.html",
    styleUrls: ["product-list.menu.page.scss"],
})
export class RecommendedMenuPage extends ProductListMenuPage implements OnInit, OnDestroy {    
    constructor(
        protected appService: AppService,
        protected orderService: OrderService,
        protected catRepository: CatRepository,
        protected wordRepository: WordRepository,
        protected productRepository: ProductRepository,
        protected route: ActivatedRoute,
        protected router: Router,
    ) {
        super(appService, orderService, catRepository, wordRepository, productRepository);
    }    

    public ngOnInit(): void {
        this.initCat();
        this.initIface();        
        this.initProducts();
    }    

    private initIface(): void {
        this.appService.headBackLink = `/table/${this.table.code}`;
        this.appService.setTitle(this.words["customer-common"]["recommended"]);
        this.appService.win.addEventListener("scroll", this.onScroll.bind(this));
    }

    private async initCat(): Promise<void> {
        this.catUrl = "recommended";
    }

    public async initProducts(): Promise<void> {
        try {
            this.productRepository.chunkCurrentPart = 0;      
            this.productRepository.filterCatId = null;
            this.productRepository.filterRecommended = true;
            await this.productRepository.loadChunk();      
            this.plReady = true;
        } catch (err) {
            this.appService.showError(err);
        }
    }    
}