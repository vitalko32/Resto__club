import { OrderProduct } from "src/model/orm/order.product.entity";

export interface IOrderNeedProducts {
    order_id: number;
    products: OrderProduct[];
}