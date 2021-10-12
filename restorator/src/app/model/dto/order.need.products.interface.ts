import { IOrderProduct } from "../orm/order.product.interface";

export interface IOrderNeedProducts {
    order_id: number;
    products: IOrderProduct[];
}