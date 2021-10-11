import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { maxConnections } from 'src/options';

@WebSocketGateway(3046, {path: "/socket/orders", cors: true})
export class OrdersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() public server: Server;      

    public afterInit(server: Server) {
        
    }    

    public handleDisconnect(client: Socket) {
        console.log(`socket client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket, ...args: any[]) {                
        if (this.server.engine.clientsCount > maxConnections) {            
            console.log("too many connections");
            client.disconnect();
        } else {
            console.log(`socket client connected: ${client.id}`);
        }        
    }
}
