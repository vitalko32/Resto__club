import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IAnswer } from "../../model/answer.interface";
import { CurrenciesService } from "./currencies.service";
import { Currency } from "../../model/orm/currency.entity";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('api/owner/currencies')
export class CurrenciesController {
    constructor (private currenciesService: CurrenciesService) {}  
    
    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Currency[]>> {
        return this.currenciesService.all(dto);
    }    
}
