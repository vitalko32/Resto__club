import { Paymethod } from "src/model/orm/order.entity";

export interface IOrderNeedInvoice {
    order_id: number;
    paymethod: Paymethod;
}