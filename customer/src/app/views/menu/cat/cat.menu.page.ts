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
    selector: "cat-menu-page",
    templateUrl: "cat.menu.page.html",
    styleUrls: ["cat.menu.page.scss"],
})
export class CatMenuPage implements OnInit, OnDestroy {
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
    get win(): HTMLElement {return this.appService.win;}
    get scrolledToBottom(): boolean {return this.win.scrollHeight - this.win.scrollTop < this.win.clientHeight + 200;}	    
    get currencySymbol(): string {return this.orderService.table.currency_symbol;}    
    get pl(): IProduct[] {return this.productRepository.xlAll;}
    get plCanLoadMore(): boolean {return this.pl.length && !this.plLoadingMore && this.scrolledToBottom && !this.productRepository.exhausted;}     

    public async ngOnInit(): Promise<void> {
        await this.initCat();
        this.initIface();        
        this.initProducts();
    }    

    public ngOnDestroy(): void {
        this.productRepository.xlAll = [];
        this.appService.win.removeEventListener("scroll", this.onScroll);
    }

    private initIface(): void {
        this.appService.headBackLink = `/table/${this.table.code}`;
        this.appService.setTitle(this.cat.name);
        this.appService.win.addEventListener("scroll", this.onScroll.bind(this));
    }

    private async initCat(): Promise<void> {
        try {            
            this.cat = await this.catRepository.loadOne(parseInt(this.route.snapshot.params["cat_id"]));            
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
    
    public async onScroll(): Promise<void> {
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

    public async toCart(p: IProduct): Promise<void> {
        this.appService.headCartHighlight = true;
        this.orderService.cartAdd(p);
        await this.appService.pause(300);
        this.appService.headCartHighlight = false;
    }
}