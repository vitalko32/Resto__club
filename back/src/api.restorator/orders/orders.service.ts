import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { Order } from "src/model/orm/order.entity";
import { Sortdir } from "src/model/sortdir.type";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService extends APIService {
    constructor (@InjectRepository(Order) private orderRepository: Repository<Order>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Order[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const data: Order[] = await this.orderRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["products", "table", "employee"]});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 
}