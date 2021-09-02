import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { TransactionsService } from "./transactions.service";
import { Transaction } from "../../model/orm/transaction.entity";

@Controller('api/owner/transactions')
export class TransactionsController {
    constructor (private transactionsService: TransactionsService) {}                

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Transaction[]>> {
        return this.transactionsService.chunk(dto);
    }    
}
