import { ICart } from "./cart.interface";

export interface IOrderCreate {
    readonly table_id: number;
    readonly cart: ICart;
}