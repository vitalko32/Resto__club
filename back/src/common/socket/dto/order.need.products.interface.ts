import { IOrderProduct } from "src/api.restorator/orders/dto/order.product.interface";

export interface IOrderNeedProducts {
    order_id: number;
    products: IOrderProduct[];
}