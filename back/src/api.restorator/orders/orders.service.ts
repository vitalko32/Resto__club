import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { Employee } from "src/model/orm/employee.entity";
import { Lang } from "src/model/orm/lang.entity";
import { Order, OrderStatus } from "src/model/orm/order.entity";
import { Serving } from "src/model/orm/serving.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IsNull, Repository } from "typeorm";
import { IOrderAccept } from "./dto/order.accept.interface";
import { IOrder } from "./dto/order.interface";
import { IServing } from "./dto/serving.interface";

@Injectable()
export class OrdersService extends APIService {
    constructor (
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
    ) {
        super();
    }    

    public async all(dto: IGetAll): Promise<IAnswer<Order[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: any = dto.filter;
            const data: Order[] = await this.orderRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["products", "table", "table.hall"]});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async accept(dto: IOrderAccept): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne(dto.order_id, {where: {status: OrderStatus.Active}});
            const employee = await this.employeeRepository.findOne(dto.employee_id);

            if (!order || !employee || order.restaurant_id !== employee.restaurant_id) {
                return {statusCode: 409, error: "wrong data"};
            }

            if (order.employee_id) {
                return {statusCode: 410, error: "order already taken"};
            }

            order.employee_id = dto.employee_id;
            order.employee_comment = dto.employee_comment;
            order.accepted_at = new Date();
            await this.orderRepository.save(order);
            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.accept: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<IOrder>> {
        try {            
            const langs: Lang[] = await this.langRepository.find({where: {active: true}});
            const order: IOrder = await this.orderRepository
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.products", "products")
                .leftJoinAndSelect("products.ingredients", "ingredients")
                .leftJoinAndSelect("products.serving", "serving")
                .leftJoinAndSelect("serving.translations", "serving_translations")
                .leftJoinAndSelect("order.table", "table")
                .leftJoinAndSelect("table.hall", "hall")
                .leftJoinAndSelect("order.employee", "employee")
                .where(`order.id = '${id}'`)
                .orderBy({"products.id": "ASC"}) // хотим получать товары в том порядке, в котором они заказывались
                .getOne(); 
                
            if (order) {
                for (let p of order.products) {
                    p.serving = this.buildMlServing(p.serving as Serving, langs);
                }
            }

            return order ? {statusCode: 200, data: order} : {statusCode: 404, error: "order not found"};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async cancel(id: number): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne(id);

            if (!order) {
                return {statusCode: 404, error: "order not found"};
            }

            order.status = OrderStatus.Cancelled;
            await this.orderRepository.save(order);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.cancel: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private buildMlServing(serving: Serving, langs: Lang[]): IServing {
        const name = {};
        
        for (let l of langs) {
            name[l.slug] = serving.translations.find(t => t.lang_id === l.id)?.name;
        }
        
        return {id: serving.id, name};
    }
}