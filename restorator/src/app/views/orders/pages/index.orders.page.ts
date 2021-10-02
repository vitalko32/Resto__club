import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Injectable()
export class IndexOrdersPage implements OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;    
    public olReady: boolean = false;
    public olOrderToCancel: Order = null;
    public olCancelConfirmActive: boolean = false;    
    public olOrderToUnneed: Order = null;
    public olPropertyToUnneed: string = null;
    public olUnneedConfirmActive: boolean = false;
    public olUnneedConfirmMsg: string = "";

    constructor(
        protected appService: AppService,        
        protected wordRepository: WordRepository,           
        protected orderRepository: OrderRepository,
        protected authService: AuthService,    
        protected router: Router,             
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get ol(): Order[] {return this.orderRepository.xlAll;}
    get employee(): Employee {return this.authService.authData.value.employee;}

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    protected initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
    }

    protected async olUpdateParam(id: number, p: string, v: any): Promise<void> {
        try {
            this.orderRepository.updateParam(id, p, v);
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
        this.olUpdateParam(this.olOrderToCancel.id, "status", OrderStatus.Cancelled);
        this.ol.splice(this.ol.indexOf(this.olOrderToCancel), 1);
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
        this.olUnneedConfirmActive = false;       
        this.olOrderToUnneed[this.olPropertyToUnneed] = false;
        this.olUpdateParam(this.olOrderToUnneed.id, this.olPropertyToUnneed, false);        
    }
}