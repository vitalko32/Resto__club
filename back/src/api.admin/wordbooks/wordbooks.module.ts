import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Word } from "src/model/orm/word.entity";

import { Wordbook } from "src/model/orm/wordbook.entity";
import { jwtConstants } from "../../common/auth.constants";
import { WordbooksController } from "./wordbooks.controller";
import { WordbooksService } from "./wordbooks.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Wordbook,  
            Word,          
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [WordbooksService],
    controllers: [WordbooksController],
})
export class WordbooksModule {}
