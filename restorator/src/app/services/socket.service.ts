import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { IWSServer } from "../model/orm/wsserver.interface";
import { AppService } from "./app.service";

// в этом проекте используется расширяемый массив сокет-серверов, на каждом из которых ограниченное количество допустимых соединений
// основной API отправляет сообщения по http на все сокет-серверы, а клиентские приложения получают эти сообщения с того сокет-сервера, к которому сейчас подключены
@Injectable()
export class SocketService {    
    public servers: IWSServer[] = [];
    private currentServer: number = 0;
    private socket: Socket = null;    

    constructor(private appService: AppService) {}

    public connect(): void {
        if (this.currentServer < this.servers.length) {                                    
            this.socket = io(this.servers[this.currentServer].url, {path: "/socket/orders"});            
            this.socket.on("disconnect", () => this.reconnect());
            this.socket.on("connect_error", () => this.reconnect());
            this.socket.on("connect_timeout", () => this.reconnect());            
        }        
    }

    // если не удалось соединиться с сокет-сервером - отключаемся, делаем паузу и пробуем соединиться со следующим сервером из списка
    public async reconnect(): Promise<void> {
        this.socket.disconnect();        
        await this.appService.pause(10000);        
        this.currentServer = this.currentServer < this.servers.length - 1 ? this.currentServer + 1 : 0;
        this.connect();
    }

    public on<T>(eventName: string): Observable<T> {        
        return new Observable<T>(observer => {
            this.socket.off(eventName); // prevent multiple subscription (optional)
            this.socket.on(eventName, (res: T) => observer.next(res));
        });
    }    
}
