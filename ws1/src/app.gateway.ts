import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { maxConnections } from 'src/options';

@WebSocketGateway(3046, {path: "/socket", cors: true})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() public server: Server;      
    
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
