import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderNewRepository } from "src/app/services/repositories/order.new.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "new-orders-page",
    templateUrl: "new.orders.page.html",
    styleUrls: ["../../styles/orders.scss"],
})
export class NewOrdersPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;    
    public olReady: boolean = false;
    public olOrderToCancel: Order = null;
    public olCancelConfirmActive: boolean = false;    
    public olOrderToAccept: Order = null;
    public olAcceptConfirmActive: boolean = false;
    public olAcceptConflictAlertActive: boolean = false;
    /*
    public olOrderToUnneed: Order = null;
    public olPropertyToUnneed: string = null;
    public olUnneedConfirmActive: boolean = false;
    public olUnneedConfirmMsg: string = "";
    */
    
    constructor(
        protected appService: AppService,        
        protected wordRepository: WordRepository,           
        protected orderRepository: OrderNewRepository,
        protected authService: AuthService,         
        protected router: Router,      
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
        this.appService.setTitle(this.words["restorator-orders"]["title-new"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-new"][lang.slug]));           
    }  
    
    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
    }

    private async initOrders(): Promise<void> {
        try {                                    
            this.orderRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;            
            this.orderRepository.loadAll();               
            this.olReady = true;
        } catch (err) {
            this.appService.showError(err);
        }
    }    
    
    public olOnAccept(o: Order): void {
        this.olOrderToAccept = o;
        this.olAcceptConfirmActive = true;
    }

    public async olAccept(): Promise<void> {
        try {
            this.olAcceptConfirmActive = false;
            const statusCode = await this.orderRepository.accept(this.olOrderToAccept.id, this.employee.id);            

            if (statusCode === 200) {                
                this.router.navigateByUrl("/orders/my");
            } else if (statusCode === 410) {
                this.olAcceptConflictAlertActive = true;
                this.ol.splice(this.ol.indexOf(this.olOrderToAccept), 1);
            } else {
                this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
            }
        } catch (err) {
            this.appService.showError(err);
        }        
    }

    public olOnCancel(o: Order): void {
        this.olOrderToCancel = o;
        this.olCancelConfirmActive = true;
    }

    public olCancel(): void { 
        this.olCancelConfirmActive = false;       
        this.orderRepository.updateParam(this.olOrderToCancel.id, "status", OrderStatus.Cancelled);
        this.ol.splice(this.ol.indexOf(this.olOrderToCancel), 1);
    }

    /*
    public olOnUnneed(o: Order, p: string): void {
        if (this.employee.is_admin || !o.employee_id || o.employee_id === this.employee.id) {
            this.olOrderToUnneed = o;
            this.olPropertyToUnneed = p;        
    
            if (p === "need_waiter") this.olUnneedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-waiter"][this.currentLang.slug];
            if (p === "need_products") this.olUnneedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-products"][this.currentLang.slug];
            if (p === "need_invoice") this.olUnneedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-invoice"][this.currentLang.slug];
    
            this.olUnneedConfirmActive = true;
        }        
    }

    public olUnneed(): void {
        this.olUnneedConfirmActive = false;       
        this.olOrderToUnneed[this.olPropertyToUnneed] = false;
        this.olUpdateParam(this.olOrderToUnneed.id, this.olPropertyToUnneed, false);        
    }*/
}