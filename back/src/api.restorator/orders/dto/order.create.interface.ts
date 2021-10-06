import { OrderStatus, Paymethod } from "src/model/orm/order.entity";
import { IOrderProduct } from "./order.product.interface";

export interface IOrderCreate {    
    readonly table_id: number;    
    readonly hall_id: number;    
    readonly restaurant_id: number;    
    readonly employee_id: number;        
    readonly employee_comment: string;    
    readonly discount_percent: number;    
    readonly status: OrderStatus;
    readonly paymethod: Paymethod;    
    readonly products?: IOrderProduct[];
}