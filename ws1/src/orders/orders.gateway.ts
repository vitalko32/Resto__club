import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3046, {path: "/socket/orders"})
export class OrdersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() public server: Server;  

    constructor() {}    

    public afterInit(server: Server) {
        console.log("socket initialized");
    }    

    public handleDisconnect(client: Socket) {
        console.log(`socket client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket, ...args: any[]) {
        console.log(`socket client connected: ${client.id}`);
    }
}
