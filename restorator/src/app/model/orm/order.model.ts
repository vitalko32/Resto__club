import { Model } from "../model";
import { Employee } from "./employee.model";
import { IOrderProduct } from "./order.product.interface";
import { Table } from "./table.model";

export enum OrderStatus {
    Active = "active",
    Completed = "completed",
    Cancelled = "cancelled",    
}

export enum Paymethod {
    Cash = "cash",
    Card = "card",
}

export class Order extends Model {
    public id: number;
    public table_id: number;
    public hall_id: number;
    public restaurant_id: number;
    public employee_id: number;
    public customer_comment: string;
    public employee_comment: string;
    public need_waiter: boolean;
    public need_invoice: boolean;
    public need_products: boolean;    
    public discount_percent: number;
    public sum: number;
    public status: OrderStatus;
    public paymethod: Paymethod;    
    public created_at: Date;    
    public accepted_at: Date;
    public completed_at: Date;
    
    public products?: IOrderProduct[];    
    public table?: Table;
    public employee?: Employee;

    get formattedCreatedAt(): string {return this.created_at ? `${this.twoDigits(this.created_at.getHours())}:${this.twoDigits(this.created_at.getMinutes())} ${this.twoDigits(this.created_at.getDate())}.${this.twoDigits(this.created_at.getMonth()+1)}.${this.created_at.getFullYear()}` : "";}
    get q(): number {return this.products.length ? this.products.map(p => p.q).reduce((acc, x) => acc + x) : 0;}
    get subtotal(): number {return this.products.length ? this.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;}
    get total(): number {return (this.subtotal / 100) * (100 - this.discount_percent);}

    public build (o: Object): any {
        for (let field in o) {
            if (field === "created_at" || field === "completed_at" || field === "accepted_at") {
                this[field] = o[field] ? new Date (o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    } 
    
    public init(restaurant_id: number, employee_id: number): Order {
        this.table_id = null;
        this.hall_id = null;
        this.restaurant_id = restaurant_id;
        this.employee_id = employee_id;   
        this.customer_comment = "";
        this.employee_comment = "";
        this.need_waiter = false;
        this.need_invoice = false;
        this.need_products = false;
        this.discount_percent = 0;
        this.status = OrderStatus.Active;
        this.paymethod = Paymethod.Cash;
        this.products = [];
        return this;
    }
}