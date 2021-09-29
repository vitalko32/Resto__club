import { Injectable } from "@angular/core";
import { Cart } from "../model/cart";
import { ICartRecord } from "../model/cartrecord.interface";
import { IOrderCreate } from "../model/dto/order.create.interface";
import { IOrder } from "../model/orm/order.interface";
import { IProduct } from "../model/orm/product.interface";
import { ITable } from "../model/orm/table.interface";
import { DataService } from "./data.service";

@Injectable()
export class OrderService {
    public order: IOrder = null;
    public table: ITable = null;
    public cart: Cart = null;

    constructor(private dataService: DataService) {
        this.initCart();
    }

    get cartQ(): number {return this.cart.records.length ? this.cart.records.map(r => r.q).reduce((acc, x) => acc + x) : 0;}
    get cartS(): number {return this.cart.records.length ? this.cart.records.map(r => r.q * r.product.price).reduce((acc, x) => acc + x) : 0;}    

    public async initTable(code: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.tablesOne(code).subscribe(res => {
                res.statusCode === 200 ? this.table = res.data : null;
                resolve(res.statusCode);
            }, err => {
                reject(err.message);
            });
        });
    }

    public initCart(): void {
        let data: string = localStorage.getItem("cart");       
        this.cart = data ? JSON.parse(data) : new Cart();            
    }

    public cartSave(): void {        
        localStorage.setItem("cart", JSON.stringify(this.cart));        
    }

    public cartClear(): void {
        this.cart = new Cart();
        this.cartSave();
    }

    public cartAdd(product: IProduct, q: number = 1): void {        
        let record: ICartRecord = this.cart.records.find(r => r.product.id === product.id);

        if (record) {                        
            record.q += q;            
        } else {
            this.cart.records.push({product, q});
        }        
        
        this.cartSave();        
    }    

    public cartRemoveRecord(record: ICartRecord): void {
        let index: number = this.cart.records.indexOf(record);
        this.cart.records.splice(index, 1);
        this.cartSave();
    }

    public orderCreate(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IOrderCreate = {table_id: this.table.id, cart: this.cart};
            this.dataService.ordersCreate(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.order = res.data;
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message)
            });
        });
    }

    public orderAdd(): Promise<void> {
        return new Promise((resolve, reject) => {

        });
    }

    public orderSend(): Promise<void> {
        return this.order ? this.orderAdd() : this.orderCreate();
    }
}