import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { Hall } from "src/model/orm/hall.entity";
import { OrderStatus } from "src/model/orm/order.entity";
import { Table } from "src/model/orm/table.entity";
import { db_name, db_schema } from "src/options";
import { getManager, Repository } from "typeorm";
import { IGetMonthStats } from "./dto/get.month.stats.interface";
import { ITableSum } from "./dto/table.sum.interface";

@Injectable()
export class StatsService extends APIService {
    constructor(@InjectRepository(Hall) private hallRepository: Repository<Hall>) {
        super();
    }

    public async tables(dto: IGetMonthStats): Promise<IAnswer<ITableSum[]>> {
        try {
            const halls = await this.hallRepository.find({where: {restaurant_id: dto.restaurant_id}, relations: ["tables"]});
            let tables: Table[] = [];

            for (let h of halls) {
                tables = [...tables, ...h.tables];
            }

            tables.sort((a, b) => a.no - b.no);
            const data: ITableSum[] = [];            

            for (let t of tables) {
                const filter = `orders.table_id='${t.id}' AND EXTRACT(MONTH FROM orders.completed_at)='${dto.month}' AND EXTRACT(YEAR FROM orders.completed_at)='${dto.year}' AND orders.status='${OrderStatus.Completed}'`;
                const sumRes = await getManager().query(`SELECT SUM(sum) AS sum FROM ${db_name}.${db_schema}.vne_orders AS orders WHERE ${filter}`);
                const sum: number = sumRes[0].sum ? parseFloat(sumRes[0].sum) : 0;   
                data.push({no: t.no, sum});
            }

            return {statusCode: 200, data};
        } catch (err) {
            const errTxt: string = `Error in StatsService.tables: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}