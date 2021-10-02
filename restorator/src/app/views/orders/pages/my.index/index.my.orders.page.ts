import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { IndexOrdersPage } from "../index.orders.page";

@Component({
    selector: "index-my-orders-page",
    templateUrl: "index.my.orders.page.html",
})
export class IndexMyOrdersPage extends IndexOrdersPage implements OnInit {
    constructor(
        protected appService: AppService,        
        protected wordRepository: WordRepository,           
        protected orderRepository: OrderRepository,
        protected authService: AuthService,         
        protected router: Router,      
    ) {
        super(appService, wordRepository, orderRepository, authService, router);
    }    

    public ngOnInit(): void {        
        this.initAuthCheck();           
        this.initTitle();          
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-my-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-my-index"][lang.slug]));           
    }    
}