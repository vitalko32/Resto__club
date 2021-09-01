import { Controller, Post } from "@nestjs/common";

import { IAnswer } from "src/model/answer.interface";
import { WordsService } from "./words.service";
import { Words } from "src/model/words.type";

@Controller('api/restorator/words')
export class WordsController {
    constructor (private wordsService: WordsService) {}    

    // get all    
    @Post("all")
    public all(): Promise<IAnswer<Words>> {
        return this.wordsService.all();
    }    
}
