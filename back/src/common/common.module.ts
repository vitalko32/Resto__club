import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lang } from "src/model/orm/lang.entity";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { Order } from "src/model/orm/order.entity";
import { OrderProduct } from "src/model/orm/order.product.entity";
import { Setting } from "src/model/orm/setting.entity";
import { Word } from "src/model/orm/word.entity";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import { FilesService } from "./files.service";
import { MailService } from "./mail.service";
import { SlugService } from "./slug.service";
import { SocketService } from "./socket/socket.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Mailtemplate,
            Setting,
            Wordbook,
            Word,        
            Order,
            OrderProduct,
            WSServer,    
            Lang,
        ]),            
    ],
    providers: [
        MailService,
        FilesService,
        SlugService,     
        SocketService,         
    ],
    exports: [
        MailService,
        FilesService,
        SlugService,         
        SocketService,    
    ],
})
export class CommonModule {}
