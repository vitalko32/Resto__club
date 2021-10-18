import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Socket } from "socket.io-client";
import { IOrderNeedProducts } from "src/app/model/dto/order.need.products.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderMyRepository } from "src/app/services/repositories/order.my.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { SocketService } from "src/app/services/socket.service";

@Component({
    selector: "index-my-orders-page",
    templateUrl: "index.my.orders.page.html",
    styleUrls: ["../../styles/orders.scss"],
})
export class IndexMyOrdersPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;   
    private socketSubscription: Subscription = null;    
    public olReady: boolean = false;
    public olOrderCancelId: number = null;
    public olCancelConfirmActive: boolean = false; 
    public olOrderCompleteId: number = null;
    public olCompleteConfirmActive: boolean = false; 
    public olOrderToUnneed: Order = null;
    public olPropertyToUnneed: string = null;
    public olUnneedConfirmActive: boolean = false;
    public olUnneedConfirmMsg: string = "";    

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,                   
        private orderRepository: OrderMyRepository,
        private authService: AuthService,      
        private socketService: SocketService,      
        private router: Router,      
    ) {}   
    
    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get ol(): Order[] {return this.orderRepository.xlAll;}
    get employee(): Employee {return this.authService.authData.value.employee;}  
    get restaurantId(): number {return this.employee.restaurant_id;}
    
    public ngOnInit(): void {   
        this.socketOnCreated = this.socketOnCreated.bind(this);
        this.socketOnUpdated = this.socketOnUpdated.bind(this);
        this.socketOnNeedWaiter = this.socketOnNeedWaiter.bind(this);
        this.socketOnNeedInvoice = this.socketOnNeedInvoice.bind(this);
        this.socketOnNeedProducts = this.socketOnNeedProducts.bind(this);        
        this.socketOnCancelled = this.socketOnCancelled.bind(this);
        this.socketOnCompleted = this.socketOnCompleted.bind(this);
        this.socketOnDeleted = this.socketOnDeleted.bind(this);
        this.initAuthCheck();           
        this.initTitle();   
        this.initOrders();     
        this.initSocket();        
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
        this.socketSubscription.unsubscribe();
        this.socketService.socket?.off(`created-${this.restaurantId}`, this.socketOnCreated);
        this.socketService.socket?.off(`updated-${this.restaurantId}`, this.socketOnUpdated);
        this.socketService.socket?.off(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);
        this.socketService.socket?.off(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);
        this.socketService.socket?.off(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);
        this.socketService.socket?.off(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
        this.socketService.socket?.off(`completed-${this.restaurantId}`, this.socketOnCompleted);
        this.socketService.socket?.off(`deleted-${this.restaurantId}`, this.socketOnDeleted);        
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-my-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-my-index"][lang.slug]));           
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

    private async initSocket(): Promise<void> {        
        await this.appService.pause(1);   
        this.socketService.qMy = 0;
        this.socketSubscription = this.socketService.socketConnected.subscribe(connected => { // обработчики сообщений вешаются после коннекта!
            if (connected) {
                this.socketService.socket.on(`created-${this.restaurantId}`, this.socketOnCreated); 
                this.socketService.socket.on(`updated-${this.restaurantId}`, this.socketOnUpdated);
                this.socketService.socket.on(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter); 
                this.socketService.socket.on(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice); 
                this.socketService.socket.on(`need-products-${this.restaurantId}`, this.socketOnNeedProducts); // сообщение с указанием employee.id!                           
                this.socketService.socket.on(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
                this.socketService.socket.on(`completed-${this.restaurantId}`, this.socketOnCompleted);
                this.socketService.socket.on(`deleted-${this.restaurantId}`, this.socketOnDeleted);                
            }
        });        
    }  

    public olOnCancel(o: Order): void {
        this.olOrderCancelId = o.id;
        this.olCancelConfirmActive = true;
    }

    public olCancel(): void { 
        try {
            this.olCancelConfirmActive = false;       
            this.orderRepository.updateParam(this.olOrderCancelId, "status", OrderStatus.Cancelled);
            const index = this.ol.findIndex(o => o.id === this.olOrderCancelId);
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
        this.olOrderCompleteId = o.id;
        this.olCompleteConfirmActive = true;
    }

    public olComplete(): void { 
        try {
            this.olCompleteConfirmActive = false;       
            this.orderRepository.complete(this.olOrderCompleteId);
            const index = this.ol.findIndex(o => o.id === this.olOrderCompleteId);
            index !== -1 ? this.ol.splice(index, 1) : null;
        } catch (err) {
            this.appService.showError(err);
        }        
    }

    // сообщения сокетов
    private async socketOnCreated(data: Order): Promise<void> {                
        if (data.employee_id === this.employee.id) {
            const order = new Order().build(data);
            order._highlight = true;
            this.ol.unshift(order);
            await this.appService.pause(3000);
            order._highlight = false;
        }        
    }

    private async socketOnUpdated(data: Order): Promise<void> {
        const index = this.ol.findIndex(o => o.id === data.id);

        // при апдейте мы не знаем, привязан этот заказ к сотруднику или нет, поэтому ищем и либо добавляем, либо удаляем, либо заменяем
        if (index !== -1) { // заказ уже был в списке           
            data.employee_id === this.employee.id ? this.ol[index] = new Order().build(data) : this.ol.splice(index, 1);
        } else { // заказа не было в списке
            this.socketOnCreated(data);
        }
    }

    private async socketOnNeedWaiter(data: Order): Promise<void> {                
        const order = this.ol.find(o => o.id === data.id);
        
        if (order) {
            order.need_waiter = true;
            order._highlightNeedWaiter = true;
            await this.appService.pause(3000);
            order._highlightNeedWaiter = false;            
        }        
    }

    private async socketOnNeedInvoice(data: Order): Promise<void> {
        const order = this.ol.find(o => o.id === data.id);

        if (order) {
            order.need_invoice = true;
            order._highlightNeedInvoice = true;
            await this.appService.pause(3000);
            order._highlightNeedInvoice = false;            
        } 
    }

    private async socketOnNeedProducts(data: IOrderNeedProducts): Promise<void> {
        const order = this.ol.find(o => o.id === data.order.id);

        if (order) {
            order.need_products = true;
            order.products = [...order.products, ...data.products];
            order._highlightNeedProducts = true;
            await this.appService.pause(3000);
            order._highlightNeedProducts = false;            
        }
    }

    private socketOnCancelled(data: number): void {        
        const index = this.ol.findIndex(o => o.id === data);
        index !== -1 ? this.ol.splice(index, 1) : null;
    }

    private socketOnCompleted(data: number): void {        
        const index = this.ol.findIndex(o => o.id === data);
        index !== -1 ? this.ol.splice(index, 1) : null;
    }

    private socketOnDeleted(data: number): void {                
        const index = this.ol.findIndex(o => o.id === data);
        index !== -1 ? this.ol.splice(index, 1) : null;             
    }    
}