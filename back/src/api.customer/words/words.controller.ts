import { Controller, Param, Post } from "@nestjs/common";

import { IAnswer } from 'src/model/dto/answer.interface';
import { WordsService } from "./words.service";
import { Words } from "src/model/words.type";

@Controller('api/customer/words')
export class WordsController {
    constructor (private wordsService: WordsService) {}    

    // get all    
    @Post("all/:restaurant_id")
    public all(@Param("restaurant_id") restaurant_id: string): Promise<IAnswer<Words>> {
        return this.wordsService.all(parseInt(restaurant_id));
    }    
}
