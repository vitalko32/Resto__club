import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { IndexOrdersPage } from "../index.orders.page";

@Component({
    selector: "index-all-orders-page",
    templateUrl: "index.all.orders.page.html",
    styleUrls: ["../../styles/orders.scss"],
})
export class IndexAllOrdersPage extends IndexOrdersPage implements OnInit {
    public olOrderToAccept: Order = null;
    public olAcceptConfirmActive: boolean = false;
    
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
        this.initOrders();      
    }    

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-all-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-all-index"][lang.slug]));           
    }    

    private async initOrders(): Promise<void> {
        try {                        
            this.orderRepository.filterStatus = OrderStatus.Active;
            this.orderRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            this.orderRepository.filterEmployeeId = null;
            this.orderRepository.loadAll();   
            await this.appService.pause(500);
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
            this.olOrderToAccept.employee_id = this.employee.id;
            this.olOrderToAccept.employee = this.employee;
            this.orderRepository.accept(this.olOrderToAccept.id, this.employee.id);
        } catch (err) {
            this.appService.showError(err);
        }        
    }
}