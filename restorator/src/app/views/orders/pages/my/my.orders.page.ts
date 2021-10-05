import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderMyRepository } from "src/app/services/repositories/order.my.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "my-orders-page",
    templateUrl: "my.orders.page.html",
    styleUrls: ["../../styles/orders.scss"],
})
export class MyOrdersPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;    
    public olReady: boolean = false;
    public olOrderToCancel: Order = null;
    public olCancelConfirmActive: boolean = false; 
    public olOrderToUnneed: Order = null;
    public olPropertyToUnneed: string = null;
    public olUnneedConfirmActive: boolean = false;
    public olUnneedConfirmMsg: string = "";
    public olOrderToComplete: Order = null;
    public olCompleteConfirmActive: boolean = false; 

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,                   
        private orderRepository: OrderMyRepository,
        private authService: AuthService,         
        private router: Router,      
    ) {}   
    
    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get ol(): Order[] {return this.orderRepository.xlAll;}
    get employee(): Employee {return this.authService.authData.value.employee;}    

    public ngOnInit(): void {        
        this.initAuthCheck();           
        this.initTitle();   
        this.initOrders();             
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-my"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-my"][lang.slug]));           
    }  
    
    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
    }

    private async initOrders(): Promise<void> {
        try {                                    
            this.orderRepository.filterEmployeeId = this.employee.id;
            this.orderRepository.loadAll();               
            this.olReady = true;
        } catch (err) {
            this.appService.showError(err);
        }
    }  

    public olOnCancel(o: Order): void {
        this.olOrderToCancel = o;
        this.olCancelConfirmActive = true;
    }

    public olCancel(): void { 
        try {
            this.olCancelConfirmActive = false;       
            this.orderRepository.updateParam(this.olOrderToCancel.id, "status", OrderStatus.Cancelled);
            const index = this.ol.indexOf(this.olOrderToCancel);
            index !== -1 ? this.ol.splice(index, 1) : null;
        } catch (err) {
            this.appService.showError(err);
        }        
    }

    public olOnUnneed(o: Order, p: string): void {        
        this.olOrderToUnneed = o;
        this.olPropertyToUnneed = p;        
    
        if (p === "need_waiter") this.olUnneedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-waiter"][this.currentLang.slug];
        if (p === "need_products") this.olUnneedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-products"][this.currentLang.slug];
        if (p === "need_invoice") this.olUnneedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-invoice"][this.currentLang.slug];
    
        this.olUnneedConfirmActive = true;                
    }

    public olUnneed(): void {
        try {
            this.olUnneedConfirmActive = false;       
            this.olOrderToUnneed[this.olPropertyToUnneed] = false;
            this.orderRepository.updateParam(this.olOrderToUnneed.id, this.olPropertyToUnneed, false);        
        } catch (err) {
            this.appService.showError(err);
        }        
    }

    public olOnComplete(o: Order): void {
        this.olOrderToComplete = o;
        this.olCompleteConfirmActive = true;
    }

    public olComplete(): void { 
        try {
            this.olCompleteConfirmActive = false;       
            this.orderRepository.complete(this.olOrderToComplete.id);
            const index = this.ol.indexOf(this.olOrderToComplete);
            index !== -1 ? this.ol.splice(index, 1) : null;
        } catch (err) {
            this.appService.showError(err);
        }        
    }
}