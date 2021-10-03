import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { Employee } from "src/model/orm/employee.entity";
import { Order, OrderStatus } from "src/model/orm/order.entity";
import { Sortdir } from "src/model/sortdir.type";
import { Repository } from "typeorm";
import { IOrderAccept } from "./dto/order.accept.interface";

@Injectable()
export class OrdersService extends APIService {
    constructor (
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) {
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
            order.accepted_at = new Date();
            await this.orderRepository.save(order);
            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.accept: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Order>> {
        try {
            const order = await this.orderRepository
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.products", "products")
                .leftJoinAndSelect("products.ingredients", "ingredients")
                .leftJoinAndSelect("order.table", "table")
                .leftJoinAndSelect("table.hall", "hall")
                .leftJoinAndSelect("order.employee", "employee")
                .where(`order.id = '${id}'`)
                .orderBy({"products.id": "ASC"}) // хотим получать товары в том порядке, в котором они заказывались
                .getOne();
            return order ? {statusCode: 200, data: order} : {statusCode: 404, error: "order not found"};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}