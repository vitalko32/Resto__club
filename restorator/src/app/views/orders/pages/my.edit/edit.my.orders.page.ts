import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderNewRepository } from "src/app/services/repositories/order.new.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "edit-my-orders-page",
    templateUrl: "edit.my.orders.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class EditMyOrdersPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;  
    public formLoading: boolean = false;
    public order: Order = null;           
    
    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,           
        private orderRepository: OrderNewRepository,
        private authService: AuthService,         
        private router: Router,    
        private route: ActivatedRoute,  
    ) {}    

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;} 
    get currency_symbol(): string {return this.employee.restaurant.currency.symbol;}   
    
    public ngOnInit(): void {        
        this.initAuthCheck();     
        this.initTitle();          
        this.initOrder();      
    }  
    
    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-my-edit"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-my-edit"][lang.slug]));           
    } 

    private async initOrder(): Promise<void> {
        try {
            this.order = await this.orderRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
        } catch (err) {
            this.appService.showError(err);
        }
    }    
}
