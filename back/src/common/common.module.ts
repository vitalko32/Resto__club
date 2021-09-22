import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { Setting } from "src/model/orm/setting.entity";
import { Word } from "src/model/orm/word.entity";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { FilesService } from "./files.service";
import { MailService } from "./mail.service";
import { SlugService } from "./slug.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Mailtemplate,
            Setting,
            Wordbook,
            Word,            
        ]),            
    ],
    providers: [
        MailService,
        FilesService,
        SlugService,              
    ],
    exports: [
        MailService,
        FilesService,
        SlugService,             
    ],
})
export class CommonModule {}
