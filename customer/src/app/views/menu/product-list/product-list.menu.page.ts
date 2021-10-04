import { Injectable, OnDestroy } from "@angular/core";
import { IProduct } from "src/app/model/orm/product.interface";
import { ITable } from "src/app/model/orm/table.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { ProductRepository } from "src/app/services/repositories/product.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Injectable()
export class ProductListMenuPage implements OnDestroy {
    public catUrl: string = null;
    public plLoadingMore: boolean = false;    
    public plReady: boolean = false;
    
    constructor(
        protected appService: AppService,
        protected orderService: OrderService,
        protected catRepository: CatRepository,
        protected wordRepository: WordRepository,
        protected productRepository: ProductRepository,        
    ) {}

    get table(): ITable {return this.orderService.table;}
    get words(): Words {return this.wordRepository.words;}
    get win(): HTMLElement {return this.appService.win;}
    get scrolledToBottom(): boolean {return this.win.scrollHeight - this.win.scrollTop < this.win.clientHeight + 200;}	    
    get currencySymbol(): string {return this.orderService.table.currency_symbol;}    
    get pl(): IProduct[] {return this.productRepository.xlAll;}
    get plCanLoadMore(): boolean {return this.pl.length && !this.plLoadingMore && this.scrolledToBottom && !this.productRepository.exhausted;}     

    public ngOnDestroy(): void {
        this.productRepository.xlAll = [];
        this.appService.win.removeEventListener("scroll", this.onScroll);
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

        p._timer ? clearTimeout(p._timer) : null;
        p._added = true;
        p._timer = window.setTimeout(() => {p._added = false; p._timer = null;}, 1000);

        await this.appService.pause(300);
        this.appService.headCartHighlight = false;
    }
}