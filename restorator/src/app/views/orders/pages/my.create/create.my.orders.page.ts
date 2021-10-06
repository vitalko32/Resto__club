import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order } from "src/app/model/orm/order.model";
import { IServing } from "src/app/model/orm/serving.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { OrderMyRepository } from "src/app/services/repositories/order.my.repository";
import { ServingRepository } from "src/app/services/repositories/serving.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-my-orders-page",
    templateUrl: "create.my.orders.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CreateMyOrdersPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;  
    public formLoading: boolean = false;
    public order: Order = null;           
    
    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,           
        private orderRepository: OrderMyRepository,
        private hallRepository: HallRepository,  
        private servingRepository: ServingRepository,     
        private authService: AuthService,         
        private router: Router,    
        private route: ActivatedRoute,  
    ) {}    

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;} 
    get currency_symbol(): string {return this.employee.restaurant.currency.symbol;}  
    get hl(): Hall[] {return this.hallRepository.xlAll;} 
    get sl(): IServing[] {return this.servingRepository.xlAll;} 
    
    public ngOnInit(): void {        
        this.initAuthCheck();     
        this.initTitle();          
        this.initOrder();     
        this.initHalls(); 
        this.initServings();
    }  
    
    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-my-create"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-my-create"][lang.slug]));           
    } 

    private initOrder(): void {
        this.order = new Order().init(this.employee.restaurant_id, this.employee.id);
    }   

    private initHalls(): void {
        try {
            this.hallRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            this.hallRepository.loadAll();             
        } catch (err) {
            this.appService.showError(err);
        }
    }

    private initServings(): void {
        try {            
            this.servingRepository.loadAll();
        } catch (err) {
            this.appService.showError(err);
        }
    }    
    
    public async create(): Promise<void> {
        try {
            this.formLoading = true;
            await this.orderRepository.create(this.order);
            this.formLoading = false;
            this.router.navigateByUrl("/orders/my");
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;
        }
    }
}
