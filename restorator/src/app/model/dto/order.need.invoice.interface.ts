import { Paymethod } from "../orm/order.model";

export interface IOrderNeedInvoice {
    order_id: number;
    paymethod: Paymethod;
}