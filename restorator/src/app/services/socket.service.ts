import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
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
    private socket: Socket = null; 
    public socketConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);   

    constructor(
        private appService: AppService,
        private authService: AuthService,
        private soundService: SoundService,
    ) {}

    get restaurantId(): number {return this.authService.authData.value.employee.restaurant_id;}

    public connect(): void {
        if (this.serverIndex < this.servers.length) {                                    
            this.socket = io(this.servers[this.serverIndex].url, {path: "/socket"});            
            this.initEvents();
        }        
    }

    private initEvents(): void {
        this.socket.on("connect", () => {            
            this.socketConnected.next(true); 
            // после коннекта можно вешать обработчики сообщений, до коннекта это работать не будет            
            this.socket.on(`created-${this.restaurantId}`, () => this.soundService.alertOrderCreated());          
        });
        this.socket.on("disconnect", () => this.reconnect());
        this.socket.on("connect_error", () => this.reconnect());
        this.socket.on("connect_timeout", () => this.reconnect());         
    }

    // если не удалось соединиться с сокет-сервером - отключаемся, делаем паузу и пробуем соединиться со следующим сервером из списка
    private async reconnect(): Promise<void> {        
        this.socketConnected.next(false);
        this.socket.disconnect();        
        this.appService.showError("reconnecting socket...");        
        await this.appService.pause(10000);        
        this.serverIndex = this.serverIndex < this.servers.length - 1 ? this.serverIndex + 1 : 0;
        this.connect();
    }

    public on<T>(eventName: string): Observable<T> {        
        return new Observable<T>(observer => {
            this.socket.off(eventName); // prevent multiple subscription (optional)
            this.socket.on(eventName, (res: T) => observer.next(res));
        });
    }    
}
