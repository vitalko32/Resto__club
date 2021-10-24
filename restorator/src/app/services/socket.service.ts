import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { IOrderNeedProducts } from "../model/dto/order.need.products.interface";
import { Order } from "../model/orm/order.model";
import { IWSServer } from "../model/orm/wsserver.interface";
import { AppService } from "./app.service";
import { AuthService } from "./auth.service";
import { SoundService } from "./sound.service";

// в этом проекте используется расширяемый массив сокет-серверов, на каждом из которых ограниченное количество допустимых соединений
// основной API отправляет сообщения по http на все сокет-серверы, а клиентские приложения получают эти сообщения с того сокет-сервера, к которому сейчас подключены
@Injectable()
export class SocketService {    
    public servers: IWSServer[] = [];
    private serverIndex: number = 0;
    public socket: Socket = null; 
    public socketConnected: BehaviorSubject<boolean> = new BehaviorSubject(false); 
    // количество событий
    public qNew: number = 0;
    public qMy: number = 0;  

    constructor(
        private appService: AppService,
        private authService: AuthService,
        private soundService: SoundService,
    ) {}

    get employeeId(): number {return this.authService.authData.value.employee.id;}
    get restaurantId(): number {return this.authService.authData.value.employee.restaurant_id;}
    get newOrdersActive(): boolean {return this.appService.url[1] === 'orders' && this.appService.url[2] === 'new';}
    get myOrdersActive(): boolean {return this.appService.url[1] === 'orders' && this.appService.url[2] === 'my';}

    public connect(): void {
        if (this.serverIndex < this.servers.length) {                                    
            this.socket = io(this.servers[this.serverIndex].url, {path: "/socket"});            
            this.initEvents();
        }        
    }

    public disconnect(): void {
        this.socket.off();
        this.socket.disconnect();
        console.log("socket disconnected");
    }

    private initEvents(): void {        
        this.socket.on("connect", () => {            
            console.log("socket connected");
            this.socketConnected.next(true); 
            // после коннекта можно вешать обработчики сообщений, до коннекта это работать не будет            
            this.socket.on(`created-${this.restaurantId}`, (data: Order) => this.onCreated(data));                      
            this.socket.on(`need-waiter-${this.restaurantId}`, (data: Order) => this.onNeedWaiter(data));                      
            this.socket.on(`need-invoice-${this.restaurantId}`, (data: Order) => this.onNeedInvoice(data));                      
            this.socket.on(`need-products-${this.restaurantId}`, (data: IOrderNeedProducts) => this.onNeedProducts(data));                      
        });
        this.socket.on("disconnect", () => this.reconnect());
        this.socket.on("connect_error", () => this.reconnect());
        this.socket.on("connect_timeout", () => this.reconnect());         
    }

    // если не удалось соединиться с сокет-сервером - отключаемся, делаем паузу и пробуем соединиться со следующим сервером из списка
    private async reconnect(): Promise<void> {            
        this.socketConnected.next(false);
        this.disconnect();
        this.appService.showError("reconnecting socket...");        
        await this.appService.pause(5000);
        this.serverIndex = this.serverIndex < this.servers.length - 1 ? this.serverIndex + 1 : 0;
        this.connect();
    }

    /*
    // события сокетов можно превратить в observable
    public on<T>(eventName: string): Observable<T> {        
        return new Observable<T>(observer => {
            this.socket.off(eventName); // unsubscribe previous subscriptions to prevent multiple subscription
            this.socket.on(eventName, (res: T) => observer.next(res));
        });
    } 
    */   

    private onCreated(data: Order): void {        
        this.soundService.alertOrderCreated();
        !data.employee_id && !this.newOrdersActive ? this.qNew++ : null; // заказ не привязан к сотруднику, и мы не в новых заказах
        data.employee_id === this.employeeId && !this.myOrdersActive ? this.qMy++ : null; // заказ привязан к текущему сотруднику, и мы не в моих заказах
    }

    private onNeedWaiter(data: Order): void {
        this.soundService.alertOrderUpdated();
        !data.employee_id && !this.newOrdersActive ? this.qNew++ : null; 
        data.employee_id === this.employeeId && !this.myOrdersActive ? this.qMy++ : null; 
    }

    private onNeedInvoice(data: Order): void {
        this.soundService.alertOrderUpdated();
        !data.employee_id && !this.newOrdersActive ? this.qNew++ : null; 
        data.employee_id === this.employeeId && !this.myOrdersActive ? this.qMy++ : null; 
    }

    private onNeedProducts(data: IOrderNeedProducts): void {
        this.soundService.alertOrderUpdated();
        !data.order.employee_id && !this.newOrdersActive ? this.qNew++ : null; 
        data.order.employee_id === this.employeeId && !this.myOrdersActive ? this.qMy++ : null; 
    }
}
