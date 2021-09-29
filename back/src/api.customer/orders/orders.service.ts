import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { Order, OrderStatus } from "src/model/orm/order.entity";
import { OrderProduct } from "src/model/orm/order.product.entity";
import { OrderProductIngredient } from "src/model/orm/order.product.ingredient.entity";
import { Table } from "src/model/orm/table.entity";
import { Repository } from "typeorm";
import { ICart } from "./dto/cart.interface";
import { ICartRecord } from "./dto/cartrecord.interface";
import { IIngredient } from "./dto/ingredient.interface";
import { IOrderAdd } from "./dto/order.add.interface";
import { IOrderCreate } from "./dto/order.create.interface";

@Injectable()
export class OrdersService extends APIService {
    constructor (
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Table) private tableRepository: Repository<Table>,
    ) {
        super();
    }   

    public async create(dto: IOrderCreate): Promise<IAnswer<Order>> {
        try {
            const table = await this.tableRepository.findOne(dto.table_id, {relations: ["hall", "hall.restaurant"]});
            
            if (!table || !table.hall || !table.hall.restaurant) {
                return {statusCode: 404, error: "table or related not found"};
            }
            
            const order = new Order();
            order.table_id = table.id;
            order.hall_id = table.hall.id;
            order.restaurant_id = table.hall.restaurant.id;
            order.customer_comment = dto.cart.comment ? `${this.humanDatetime(new Date())} ${dto.cart.comment}\n` : "";
            order.products = this.buildOrderProducts(dto.cart);
            await this.orderRepository.save(order);

            return {statusCode: 200, data: order};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async add(dto: IOrderAdd): Promise<IAnswer<Order>> {
        try {
            const order = await this.orderRepository.findOne(dto.order_id, {relations: ["products", "products.ingredients"]});           

            if (!order) {
                return {statusCode: 404, error: "order not found"};
            }

            order.customer_comment += dto.cart.comment ? `${this.humanDatetime(new Date())} ${dto.cart.comment}\n` : "";
            order.products = [...order.products, ...this.buildOrderProducts(dto.cart)];
            await this.orderRepository.save(order);

            return {statusCode: 200, data: order};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.add: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async check(id: number): Promise<IAnswer<Order>> {
        try {
            const order = await this.orderRepository.findOne(id, {where: {status: OrderStatus.Active}});
            return order ? {statusCode: 200, data: order} : {statusCode: 404, error: "active order not found"};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.check: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private buildOrderProducts(cart: ICart): OrderProduct[] {
        const products: OrderProduct[] = [];

        for (let r of cart.records) {
            const product = new OrderProduct();
            product.serving_id = cart.serving_id;
            product.code = r.product.code;
            product.name = r.product.name;
            product.img = r.product.images.length ? r.product.images[0].img : null;
            product.price = r.product.price;
            product.q = r.q;
            product.ingredients = [];

            for (let i of r.product.ingredients) {
                const ingredient = new OrderProductIngredient();
                ingredient.name = i.name;
                ingredient.included = (<IIngredient>i).included;
                product.ingredients.push(ingredient);
            }

            products.push(product);
        }

        return products;
    }
}