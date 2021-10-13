import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Socket } from "socket.io-client";
import { IOrderAccepted } from "src/app/model/dto/order.accepted.interface";
import { IOrderNeedInvoice } from "src/app/model/dto/order.need.invoice.interface";
import { IOrderNeedProducts } from "src/app/model/dto/order.need.products.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderNewRepository } from "src/app/services/repositories/order.new.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { SocketService } from "src/app/services/socket.service";

@Component({
    selector: "index-new-orders-page",
    templateUrl: "index.new.orders.page.html",
    styleUrls: ["../../styles/orders.scss"],
})
export class IndexNewOrdersPage implements OnInit, OnDestroy {
    private langSubscription: Subscription = null;
    private authSubscription: Subscription = null;    
    private socketSubscription: Subscription = null;    
    public olReady: boolean = false;
    public olOrderCancelId: number = null;
    public olCancelConfirmActive: boolean = false;    
    public olOrderAcceptId: number = null;
    public olAcceptConfirmActive: boolean = false;
    public olAcceptConflictAlertActive: boolean = false;        
    
    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,           
        private orderRepository: OrderNewRepository,
        private authService: AuthService,    
        private socketService: SocketService,     
        private router: Router,      
    ) {}    

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get ol(): Order[] {return this.orderRepository.xlAll;}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get restaurantId(): number {return this.employee.restaurant_id;}
    get socket(): Socket {return this.socketService.socket;}
    get socketConnected(): BehaviorSubject<boolean> {return this.socketService.socketConnected;}
    
    public ngOnInit(): void {    
        this.socketOnCreated = this.socketOnCreated.bind(this);
        this.socketOnUpdated = this.socketOnUpdated.bind(this);
        this.socketOnNeedWaiter = this.socketOnNeedWaiter.bind(this);
        this.socketOnNeedInvoice = this.socketOnNeedInvoice.bind(this);
        this.socketOnNeedProducts = this.socketOnNeedProducts.bind(this);
        this.socketOnCancelled = this.socketOnCancelled.bind(this);
        this.socketOnCompleted = this.socketOnCompleted.bind(this);
        this.socketOnAccepted = this.socketOnAccepted.bind(this);
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
        this.socket.off(`created-${this.restaurantId}`, this.socketOnCreated);
        this.socket.off(`updated-${this.restaurantId}`, this.socketOnUpdated);
        this.socket.off(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);
        this.socket.off(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);
        this.socket.off(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);
        this.socket.off(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
        this.socket.off(`completed-${this.restaurantId}`, this.socketOnCompleted);
        this.socket.off(`accepted-${this.restaurantId}`, this.socketOnAccepted);
        this.socket.off(`deleted-${this.restaurantId}`, this.socketOnDeleted);
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-new-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-new-index"][lang.slug]));           
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
    
    private initSocket(): void {
        this.socketSubscription = this.socketConnected.subscribe(connected => { // обработчики сообщений вешаются после коннекта!
            if (connected) {
                this.socket.on(`created-${this.restaurantId}`, this.socketOnCreated);
                this.socket.on(`updated-${this.restaurantId}`, this.socketOnUpdated);
                this.socket.on(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);                
                this.socket.on(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);                
                this.socket.on(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);                
                this.socket.on(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
                this.socket.on(`completed-${this.restaurantId}`, this.socketOnCompleted);
                this.socket.on(`accepted-${this.restaurantId}`, this.socketOnAccepted);
                this.socket.on(`deleted-${this.restaurantId}`, this.socketOnDeleted);
            }
        });        
    }    
    
    public olOnAccept(o: Order): void {
        this.olOrderAcceptId = o.id;
        this.olAcceptConfirmActive = true;
    }

    public async olAccept(): Promise<void> {
        try {
            this.olAcceptConfirmActive = false;
            const statusCode = await this.orderRepository.accept(this.olOrderAcceptId, this.employee.id);            

            if (statusCode === 200) {                
                this.router.navigateByUrl("/orders/my");
            } else if (statusCode === 410) {
                this.olAcceptConflictAlertActive = true;                
                const index = this.ol.findIndex(o => o.id === this.olOrderAcceptId);
                index !== -1 ? this.ol.splice(index, 1) : null; // на всяк. случай проверяем, потому что заказ может исчезнуть по команде сокета
            } else {
                this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
            }
        } catch (err) {
            this.appService.showError(err);
        }        
    }

    public olOnCancel(o: Order): void {
        this.olOrderCancelId = o.id;
        this.olCancelConfirmActive = true;
    }

    public olCancel(): void {
        try {
            this.olCancelConfirmActive = false;       
            this.orderRepository.cancel(this.olOrderCancelId);            
            const index = this.ol.findIndex(o => o.id === this.olOrderCancelId);
            index !== -1 ? this.ol.splice(index, 1) : null; // на всяк. случай проверяем, потому что заказ может исчезнуть по команде сокета
        } catch (err) {
            this.appService.showError(err);
        }       
    }  
    
    // сообщения сокетов
    private async socketOnCreated(data: Order): Promise<void> {        
        const order = new Order().build(data);
        order._highlight = true;
        this.ol.unshift(order);
        await this.appService.pause(3000);
        order._highlight = false;        
    }

    private socketOnUpdated(data: Order): void {
        const index = this.ol.findIndex(o => o.id === data.id);

        if (index !== -1) {
            // при апдейте мы не знаем, привязан этот заказ к сотруднику или нет, поэтому проверяем и либо удаляем, либо заменяем
            data.employee_id ? this.ol.splice(index, 1) : this.ol[index] = new Order().build(data);
        }        
    }

    private async socketOnNeedWaiter(data: number): Promise<void> {                
        const order = this.ol.find(o => o.id === data);
        
        if (order) {
            order.need_waiter = true;
            order._highlightNeedWaiter = true;
            await this.appService.pause(3000);
            order._highlightNeedWaiter = false;            
        }        
    }

    private async socketOnNeedInvoice(data: IOrderNeedInvoice): Promise<void> {
        const order = this.ol.find(o => o.id === data.order_id);

        if (order) {
            order.need_invoice = true;
            order._highlightNeedInvoice = true;
            await this.appService.pause(3000);
            order._highlightNeedInvoice = false;            
        } 
    }

    private async socketOnNeedProducts(data: IOrderNeedProducts): Promise<void> {
        const order = this.ol.find(o => o.id === data.order_id);

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

    private socketOnAccepted(data: IOrderAccepted): void {                
        const index = this.ol.findIndex(o => o.id === data.order_id);
        index !== -1 ? this.ol.splice(index, 1) : null;                
    }

    private socketOnDeleted(data: number): void {                
        const index = this.ol.findIndex(o => o.id === data);
        index !== -1 ? this.ol.splice(index, 1) : null;             
    }
}
