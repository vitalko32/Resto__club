import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { Order } from "src/model/orm/order.entity";
import { OrderProduct } from "src/model/orm/order.product.entity";
import { OrderProductIngredient } from "src/model/orm/order.product.ingredient.entity";
import { Table } from "src/model/orm/table.entity";
import { Repository } from "typeorm";
import { ICart } from "./dto/cart.interface";
import { IIngredient } from "./dto/ingredient.interface";
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
            order.customer_comment = dto.cart.comment;
            order.products = [];

            for (let r of dto.cart.records) {
                const product = new OrderProduct();
                product.serving_id = dto.cart.serving_id;
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

                order.products.push(product);
            }

            await this.orderRepository.save(order);
            return {statusCode: 200, data: order};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}