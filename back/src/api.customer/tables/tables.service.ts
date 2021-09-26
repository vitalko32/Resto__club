import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IAnswer } from "src/model/dto/answer.interface";
import { Table } from "src/model/orm/table.entity";
import { Repository } from "typeorm";
import { ITable } from "./dto/table.interface";

@Injectable()
export class TablesService {
    constructor(@InjectRepository(Table) private tableRepository: Repository<Table>) {}

    public async one(code: string): Promise<IAnswer<ITable>> {
        try {
            const table = await this.tableRepository.findOne({where: {code}, relations: ["hall", "hall.restaurant"]});

            if (!table || !table.hall || !table.hall.restaurant) {
                return {statusCode: 404, error: "table or related not found"};
            }

            const data: ITable = {
                id: table.id,
                no: table.no,
                seats: table.seats,
                code: table.code,
                hall_id: table.hall.id,
                restaurant_id: table.hall.restaurant.id,                 
            };

            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in TablesService.dataByCode: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }
}