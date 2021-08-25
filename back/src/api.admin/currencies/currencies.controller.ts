import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { CurrenciesService } from "./currencies.service";
import { Currency } from "../../model/orm/currency.entity";
import { ICurrencyUpdateDTO } from "./dto/currency.update.dto";
import { ICurrencyCreateDTO } from "./dto/currency.create.dto";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('api/admin/currencies')
export class CurrenciesController {
    constructor (private currenciesService: CurrenciesService) {}  
    
    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Currency[]>> {
        return this.currenciesService.all(dto);
    }  
    
    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Currency[]>> {
        return this.currenciesService.chunk(dto);
    }
    
    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Currency>> {
        return this.currenciesService.one(parseInt(id));
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: ICurrencyCreateDTO): Promise<IAnswer<void>> {
        return this.currenciesService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: ICurrencyUpdateDTO): Promise<IAnswer<void>> {
        return this.currenciesService.update(dto);
    }
    
    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.currenciesService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AuthGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.currenciesService.deleteBulk(ids);
    }
}
