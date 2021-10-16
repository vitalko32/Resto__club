import { Injectable } from "@nestjs/common";
import { ISocketMsg } from "src/dto/socket.msg.interface";
import { AppGateway } from "./app.gateway";

@Injectable()
export class AppService {
    constructor(private appGateway: AppGateway) {}

    public translate(msg: ISocketMsg): void {        
        this.appGateway.server.emit(msg.name, msg.data);
    }
}