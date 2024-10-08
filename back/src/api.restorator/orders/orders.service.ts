import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { SocketService } from "src/common/socket/socket.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { Employee } from "src/model/orm/employee.entity";
import { Lang } from "src/model/orm/lang.entity";
import { Order, OrderStatus } from "src/model/orm/order.entity";
import { Serving } from "src/model/orm/serving.entity";
import { Sortdir } from "src/model/sortdir.type";
import { db_name, db_schema } from "src/options";
import { getManager, Repository } from "typeorm";
import { ServingsService } from "../servings/servings.service";
import { IOrderAccept } from "./dto/order.accept.interface";
import { IOrderCreate } from "./dto/order.create.interface";
import { IOrder } from "./dto/order.interface";
import { IOrderUpdate } from "./dto/order.update.interface";
import * as ExcelJS from "exceljs";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { Words } from "src/model/words.type";

@Injectable()
export class OrdersService extends APIService {
    constructor (
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
        @InjectRepository(Wordbook) private wordbookRepository: Repository<Wordbook>,
        private servingsService: ServingsService,
        private socketService: SocketService,
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
            this.socketService.translateOrderAccepted(order.id);

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
                .orderBy({"products.id": "ASC", "ingredients.id": "ASC"}) // хотим получать товары в том порядке, в котором они заказывались
                .getOne(); 
                
            if (order) {
                for (let p of order.products) {
                    p.serving = this.servingsService.buildMlServing(p.serving as Serving, langs);
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
            this.socketService.translateOrderCancelled(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.cancel: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async complete(id: number): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne(id);

            if (!order) {
                return {statusCode: 404, error: "order not found"};
            }

            order.status = OrderStatus.Completed;
            order.completed_at = new Date();
            await this.orderRepository.save(order);
            this.socketService.translateOrderCompleted(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.complete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IOrderUpdate): Promise<IAnswer<void>> {
        try {
            // удаляем лишние присоединенные объекты, чтобы не записалось каскадом лишнего (в typeorm каскад работает странно)
            delete dto.table;
            delete dto.hall;
            delete dto.employee;
            delete dto.restaurant;

            if (dto.products?.length) {
                for (let p of dto.products) {
                    delete p.serving;
                }
            }

            const order = this.orderRepository.create(dto);
            const subtotal = order.products.length ? order.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;
            order.sum = (subtotal / 100) * (100 - order.discount_percent);
            await this.orderRepository.save(order);
            this.socketService.translateOrderUpdated(order.id);
            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async create(dto: IOrderCreate): Promise<IAnswer<void>> {
        try {
            const order = this.orderRepository.create(dto);            
            const subtotal = order.products.length ? order.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;
            order.sum = (subtotal / 100) * (100 - order.discount_percent);            
            await this.orderRepository.save(order);
            this.socketService.translateOrderCreated(order.id);

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Order[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            const filter = this.buildFilter(dto.filter);            
            const query = this.orderRepository.createQueryBuilder("orders").where(filter);
            const data: Order[] = await query
                .leftJoinAndSelect("orders.table", "table")
                .leftJoinAndSelect("orders.employee", "employee")
                .leftJoinAndSelect("orders.hall", "hall")
                .orderBy({[`orders.${sortBy}`]: sortDir})
                .take(q)
                .skip(from)
                .getMany();
            const allLength: number = await query.getCount();
            const sum = Number((await this.orderRepository.createQueryBuilder("orders").select("SUM(orders.sum)", "sum").where(filter).getRawOne()).sum);              

            return {statusCode: 200, data, allLength, sum};
        } catch (err) {
            const errTxt: string = `Error in OrdersService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async export(dto: IGetAll): Promise<ExcelJS.Buffer> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";              
            const filter = this.buildFilter(dto.filter);            
            const query = this.orderRepository.createQueryBuilder("orders").where(filter);            
            const orders: Order[] = await query
                .leftJoinAndSelect("orders.table", "table")
                .leftJoinAndSelect("orders.employee", "employee")
                .leftJoinAndSelect("orders.hall", "hall")
                .orderBy({[`orders.${sortBy}`]: sortDir})
                .getMany();                        
            const sum = Number((await this.orderRepository.createQueryBuilder("orders").select("SUM(orders.sum)", "sum").where(filter).getRawOne()).sum);              
            const words = await this.buildWords(dto.lang_id);            
            const buffer = await this.buildExcel(orders, sum, words);            
            return buffer;
        } catch (err) {
            const errTxt: string = `Error in OrdersService.export: ${String(err)}`;
            console.log(errTxt);
            return null;
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne(id);

            if (!order) {
                return {statusCode: 404, error: "order not found"};
            }
            
            await this.orderRepository.delete(id);
            this.socketService.translateOrderDeleted(order);
            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async activate(id: number): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne(id);

            if (!order) {
                return {statusCode: 404, error: "order not found"};
            }

            order.status = OrderStatus.Active;
            order.completed_at = null;
            await this.orderRepository.save(order);
            this.socketService.translateOrderCreated(order.id); // с точки зрения официанта он как бы создался заново

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.activate: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private buildFilter(o: any): string {
        let filter: string = "TRUE";         

        if (o.created_at[0]) {
            const from: string = this.mysqlDate(new Date(o.created_at[0]));
            const to: string = o.created_at[1] ? this.mysqlDate(new Date(o.created_at[1])) : from;
            filter += ` AND orders.created_at BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`;
        }

        if (o.restaurant_id) {
            filter += ` AND orders.restaurant_id = '${o.restaurant_id}'`;
        }

        if (o.hall_id) {
            filter += ` AND orders.hall_id = '${o.hall_id}'`;
        }

        if (o.table_id) {
            filter += ` AND orders.table_id = '${o.table_id}'`;
        }

        if (o.employee_id) {
            filter += ` AND orders.employee_id = '${o.employee_id}'`;
        } 
        
        if (o.status) {
            filter += ` AND orders.status = '${o.status}'`;
        } 

        return filter;
    }

    private async buildWords(lang_id: number): Promise<Words> {                        
        let words = {};
        let wbl = await this.wordbookRepository.find({relations: ["words", "words.translations"]});            
        
        for (let wb of wbl) {
            words[wb.name] = {};

            for (let w of wb.words) {                
                words[wb.name][w.mark] = w.translations.find(t => t.lang_id === lang_id)?.text;                    
            }
        }        
        
        return words;
    }

    private async buildExcel(orders: Order[], sum: number, words: Words): Promise<ExcelJS.Buffer> {                
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('orders');
        worksheet.columns = [
            {width: 20},
            {width: 20},
            {width: 20},
            {width: 20},
            {width: 20},
            {width: 20},
            {width: 20},            
        ];                    
        let row = worksheet.getRow(1);
        row.values = [
            words["restorator-orders"]["created-at"],
            words["restorator-orders"]["no"],
            words["restorator-orders"]["hall"],
            words["restorator-orders"]["table2"],
            words["restorator-orders"]["employee"],
            words["restorator-orders"]["sum"],
            words["restorator-orders"]["status"],
        ];
        row.eachCell((cell, no) => cell.font = {bold: true});        
        
        for (let i = 0; i < orders.length; i++) {
            const o = orders[i];            
            row = worksheet.getRow(i + 2);
            row.values = [
                this.humanDatetime(o.created_at),
                o.id,
                o.hall?.name,
                o.table?.no,
                o.employee?.name,
                o.sum,
                words["restorator-orders"][`status-${o.status}`],
            ];            
        }

        row = worksheet.getRow(orders.length + 2);
        row.values = ["","","","","",sum,""];

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }    
}
