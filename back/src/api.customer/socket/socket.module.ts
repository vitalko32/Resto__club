import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/model/orm/order.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import { SocketService } from "./socket.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            WSServer,    
            Order,        
        ]),        
    ],    
    providers: [SocketService],
    controllers: [],
    exports: [SocketService],
})
export class SocketModule {}
