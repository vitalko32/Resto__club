import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Cat } from "src/app/model/orm/cat.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Product } from "src/app/model/orm/product.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { ProductRepository } from "src/app/services/repositories/product.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "index-products-page",
    templateUrl: "index.products.page.html",
    styleUrls: ["index.products.page.scss"],
})
export class IndexProductsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;  
    public plSearch: BehaviorSubject<string> = new BehaviorSubject("");
    private plSearchSubscription: Subscription = null;        
    public plSearchString: string = "";
    public plLoadingMore: boolean = false;    

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,            
        private catRepository: CatRepository,
        private productRepository: ProductRepository,
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get cl(): Cat[] {return this.catRepository.xlAll;}
    get pl(): Product[] {return this.productRepository.xlAll;}
    get plFilterCatId(): number {return this.productRepository.filterCatId;}
    set plFilterCatId(v: number) {this.productRepository.filterCatId = v;}
    get plCanLoadMore(): boolean {return this.pl.length && !this.plLoadingMore && this.scrolledToBottom && !this.productRepository.exhausted;}   
    get scrolledToBottom(): boolean {return window.scrollY + window.innerHeight > document.body.scrollHeight - 100;}	    
    get currencySymbol(): string {return this.authService.authData.value.employee?.restaurant?.currency?.symbol;}    

    public async ngOnInit(): Promise<void> {        
        this.initTitle();  
        this.initAuthCheck();     
        await this.initCats();      
        this.initProducts();  
        //this.initFilter();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
        this.plSearchSubscription?.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-products"]["title-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-products"]["title-index"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private async initCats(): Promise<void> {
        try {
            this.catRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            await this.catRepository.loadAll();             

            if (!this.plFilterCatId) {
                this.plFilterCatId = this.cl[0].id;
            } else {
                const temp = this.cl.find(c => c.id === this.plFilterCatId);
                !temp ? this.plFilterCatId = this.cl[0].id : null;
            }
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public async initProducts(): Promise<void> {
        try {
            this.productRepository.chunkCurrentPart = 0;      
            this.productRepository.filterNameCode = this.plSearchString;
            this.productRepository.loadChunk();      
        } catch (err) {
            this.appService.showError(err);
        }
    }

    /*private initFilter(): void {
        try {            
            this.plSearchSubscription = this.plSearch.subscribe(s => {
                if (this.productRepository.filterNameCode !== s) {                                    
                    this.productRepository.filterNameCode = s;                    
                    this.productRepository.chunkCurrentPart = 0;    
                    this.productRepository.loadChunk();
                }
            });        
        } catch (err) {
            this.appService.showError(err);
        }
    } */ 

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