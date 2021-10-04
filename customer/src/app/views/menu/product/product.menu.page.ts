import { Component, OnInit } from "@angular/core";
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
    selector: "product-menu-page",
    templateUrl: "product.menu.page.html",
    styleUrls: ["product.menu.page.scss"],
})
export class ProductMenuPage implements OnInit {
    public product: IProduct = null;
    public cat: ICat = null;
    public catUrl: string = null;
    public q: number = 1;

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
    get currencySymbol(): string {return this.orderService.table.currency_symbol;}    

    public async ngOnInit(): Promise<void> {
        this.initProduct();
        await this.initCat();
        this.initIface();        
    }    
    
    private initIface(): void {        
        this.appService.headBackLink = `/table/${this.table.code}/menu/${this.catUrl}`;
        this.appService.setTitle(this.catUrl !== "recommended" ? this.cat.name : this.words["customer-common"]["recommended"]);
    }

    private async initCat(): Promise<void> {
        try {            
            this.catUrl = this.route.snapshot.params["cat"];
            this.catUrl !== "recommended" ? this.cat = await this.catRepository.loadOne(parseInt(this.catUrl)) : null;            
        } catch (err) {
            err === 404 ? this.router.navigateByUrl(`/table/${this.table.code}/error/404`) : this.appService.showError(err);            
        }
    }

    public async initProduct(): Promise<void> {
        try {
            this.product = await this.productRepository.loadOne(parseInt(this.route.snapshot.params["product"]));            
        } catch (err) {
            err === 404 ? this.router.navigateByUrl(`/table/${this.table.code}/error/404`) : this.appService.showError(err);            
        }
    }
    
    public async like(): Promise<void> {
        try {
            const statusCode = await this.productRepository.like(this.product.id);
            statusCode === 200 ? this.product.likes++ : null;
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public async toCart(): Promise<void> {
        this.appService.headCartHighlight = true;
        this.orderService.cartAdd(this.product, this.q);

        this.product._timer ? clearTimeout(this.product._timer) : null;
        this.product._added = true;
        this.product._timer = window.setTimeout(() => {this.product._added = false; this.product._timer = null;}, 1000);

        await this.appService.pause(300);
        this.appService.headCartHighlight = false;
    }
}