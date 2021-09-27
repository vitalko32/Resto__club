import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICat } from "src/app/model/orm/cat.interface";
import { IProduct } from "src/app/model/orm/product.interface";
import { ITable } from "src/app/model/orm/table.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { ProductRepository } from "src/app/services/repositories/product.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "cat-page",
    templateUrl: "cat.page.html",
    styleUrls: ["cat.page.scss"],
})
export class CatPage implements OnInit, OnDestroy {
    public cat: ICat = null;    
    public plLoadingMore: boolean = false;    
    public plReady: boolean = false;
    
    constructor(
        private appService: AppService,
        private orderService: OrderService,
        private catRepository: CatRepository,
        private wordRepository: WordRepository,
        private productRepository: ProductRepository,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    get table(): ITable {return this.orderService.table;}
    get words(): Words {return this.wordRepository.words;}
    get scrolledToBottom(): boolean {return window.scrollY + window.innerHeight > document.body.scrollHeight - 100;}	    
    get currencySymbol(): string {return this.orderService.table.currency_symbol;}    
    get pl(): IProduct[] {return this.productRepository.xlAll;}
    get plCanLoadMore(): boolean {return this.pl.length && !this.plLoadingMore && this.scrolledToBottom && !this.productRepository.exhausted;}     

    public ngOnInit(): void {
        this.initIface();
        this.initCat();
        this.initProducts();
    }    

    public ngOnDestroy(): void {
        this.productRepository.xlAll = [];
    }

    private initIface(): void {
        this.appService.backLink = `/table/${this.table.code}`;
    }

    private async initCat(): Promise<void> {
        try {            
            this.cat = await this.catRepository.loadOne(parseInt(this.route.snapshot.params["cat_id"]));
            this.appService.setTitle(this.cat.name);
        } catch (err) {
            err === 404 ? this.router.navigateByUrl(`/table/${this.table.code}/error/404`) : this.appService.showError(err);            
        }
    }

    public async initProducts(): Promise<void> {
        try {
            this.productRepository.chunkCurrentPart = 0;      
            this.productRepository.filterCatId = parseInt(this.route.snapshot.params["cat_id"]);   
            await this.productRepository.loadChunk();      
            this.plReady = true;
        } catch (err) {
            this.appService.showError(err);
        }
    }  

    @HostListener('window:scroll', ['$event'])
    public async onScroll(event: any): Promise<void> {
        try {            
			if (this.plCanLoadMore) {
				this.plLoadingMore = true;
				this.productRepository.chunkCurrentPart++;				
                await this.productRepository.loadChunk();                
				this.plLoadingMore = false;		                
			}			
		} catch (err) {
			this.plLoadingMore = false;
			this.appService.showError(err);
		}
    } 
}