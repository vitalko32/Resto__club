import { Cart } from "../cart";

export interface IOrderCreate {
    readonly table_id: number;
    readonly cart: Cart;
}