import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Order } from "src/app/model/orm/order.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "index-all-orders-page",
    templateUrl: "index.all.orders.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class IndexAllOrdersPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public olLoading: boolean = false;
    public olSortingVariants: any[][] = // для мобильной верстки
        [["created_at", 1], ["created_at", -1], ["sum", 1], ["sum", -1]];   
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,   
        private orderRepository: OrderRepository,         
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get ol(): Order[] {return this.orderRepository.xlChunk;}
    get olSum(): number {return this.orderRepository.sum;}
    get olCurrentPart(): number {return this.orderRepository.chunkCurrentPart;}
    set olCurrentPart(v: number) {this.orderRepository.chunkCurrentPart = v;}
    get olAllLength(): number {return this.orderRepository.allLength;}  
    get olLength(): number {return this.orderRepository.chunkLength;}   
    get olSortBy(): string {return this.orderRepository.chunkSortBy;}
    get olSortDir(): number {return this.orderRepository.chunkSortDir;}
    set olSortBy(v: string) {this.orderRepository.chunkSortBy = v;}
    set olSortDir(v: number) {this.orderRepository.chunkSortDir = v;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();   
        this.initOrders();   
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-all-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-all-index"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initOrders(): Promise<void> {
        try {
            this.olLoading = true;
            this.orderRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            await this.orderRepository.loadChunk();                     
            await this.appService.pause(500);
            this.olLoading = false;       
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.olSortBy === sortBy) {
            this.olSortDir *= -1;
        } else {
            this.olSortBy = sortBy;
            this.olSortDir = 1;
        }

        this.initOrders();
    }

    public setSorting(i: string): void {
        let sorting = this.olSortingVariants[parseInt(i)];
        this.olSortBy = sorting[0];
        this.olSortDir = sorting[1];
        this.initOrders();
    }

    /*
    public onDelete(o: Order): void {
        this.deleteId = o.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${h.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.olLoading = true;            
            await this.orderRepository.delete(this.deleteId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }
    } */ 
}