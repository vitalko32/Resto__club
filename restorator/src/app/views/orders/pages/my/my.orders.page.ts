import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "my-orders-page",
    templateUrl: "my.orders.page.html",
})
export class MyOrdersPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;    

    constructor(
        protected appService: AppService,        
        protected wordRepository: WordRepository,                   
        protected authService: AuthService,         
        protected router: Router,      
    ) {}   
    
    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get employee(): Employee {return this.authService.authData.value.employee;}

    public ngOnInit(): void {        
        this.initAuthCheck();           
        this.initTitle();          
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
}