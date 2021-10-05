import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Cat } from "src/app/model/orm/cat.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order } from "src/app/model/orm/order.model";
import { IOrderProduct } from "src/app/model/orm/order.product.interface";
import { Product } from "src/app/model/orm/product.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { ProductRepository } from "src/app/services/repositories/product.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "product-finder",
    templateUrl: "product-finder.component.html",
    styleUrls: [
        "product-finder.component.scss",
        "../../../../common.styles/catalogue.scss",
    ]
})
export class ProductFinderComponent implements OnInit, OnChanges {
    @Input() active: boolean = false;
    @Input() order: Order;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    public plSearch: string = "";
    public plReady: boolean = false;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private catRepository: CatRepository,
        private productRepository: ProductRepository,
        private authService: AuthService,       
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get currencySymbol(): string {return this.authService.authData.value.employee?.restaurant?.currency?.symbol;}    
    get cl(): Cat[] {return this.catRepository.xlAll;}
    get pl(): Product[] {return this.productRepository.xlAll;}
    get plFilterCatId(): number {return this.productRepository.filterCatId;}
    set plFilterCatId(v: number) {this.productRepository.filterCatId = v;}
    get plFilterNameCode(): string {return this.productRepository.filterNameCode;}      

    public async ngOnInit(): Promise<void> {        
        await this.initCats();      
        this.initProducts();          
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.active) {
            changes.active.currentValue ? document.body.classList.add("no-scroll") : document.body.classList.remove("no-scroll");
        }
    }

    private async initCats(): Promise<void> {
        try {
            this.catRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            await this.catRepository.loadAll();             
            this.plFilterCatId = this.cl[0].id;            
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public async initProducts(): Promise<void> {
        try {            
            this.plReady = false;
            this.productRepository.filterNameCode = this.plSearch;            
            await this.productRepository.loadAll();  
            
            for (let p of this.pl) {
                p._q = 1;
                p._added = false;
                p._timer = null;
            }

            this.plReady = true;
        } catch (err) {
            this.appService.showError(err);
        }
    } 
    
    public close(): void {
        this.activeChange.emit(false);
    }

    public add(p: Product): void {
        this.order.products.push(this.product2OrderProduct(p));
        p._timer ? clearTimeout(p._timer) : null;
        p._added = true;
        p._timer = window.setTimeout(() => {p._added = false; p._timer = null;}, 1000);
    }

    private product2OrderProduct(p: Product): IOrderProduct {
        return {
            serving_id: 1,
            code: p.code,
            name: p.name,
            img: p.images.length ? p.images[0].img : null,
            price: p.price,
            q: p._q,
            completed: false,
            ingredients: p.ingredients.map(i => ({
                name: i.name,
                included: true,
            })),
        };
    }
}