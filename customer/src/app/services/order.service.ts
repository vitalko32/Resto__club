import { Injectable } from "@angular/core";
import { Cart } from "../model/cart";
import { ICartRecord } from "../model/cartrecord.interface";
import { IOrderAdd } from "../model/dto/order.add.interface";
import { IOrderCallWaiter } from "../model/dto/order.callwaiter.interface";
import { IOrderClose } from "../model/dto/order.close.interface";
import { IOrderCreate } from "../model/dto/order.create.interface";
import { IOrder, Paymethod } from "../model/orm/order.interface";
import { IProduct } from "../model/orm/product.interface";
import { ITable } from "../model/orm/table.interface";
import { AppService } from "./app.service";
import { DataService } from "./data.service";

@Injectable()
export class OrderService {    
    public order: IOrder = null;
    private orderCheckInteval: number = null;
    public table: ITable = null;
    public cart: Cart = null;

    constructor(
        private dataService: DataService,
        private appService: AppService,        
    ) {}
    
    get cartQ(): number {return this.cart.records.length ? this.cart.records.map(r => r.q).reduce((acc, x) => acc + x) : 0;}
    get cartS(): number {return this.cart.records.length ? this.cart.records.map(r => r.q * r.product.price).reduce((acc, x) => acc + x) : 0;}    
    get orderSubtotal(): number {return this.order.products.length ? this.order.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;}
    get orderTotal(): number {return (this.orderSubtotal / 100) * (100 - this.order.discount_percent);}
    
    public async initTable(code: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.tablesOneByCode(code).subscribe(res => {
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

    public initOrder(): void {
        const data: string = localStorage.getItem("orders");       
        const orders: IOrder[] = data ? JSON.parse(data) : [];  
        this.order = orders.find(o => o.table_id === this.table.id) || null;         
        this.orderStartChecking(); // периодически проверяем актуальность и состояние заказа
    }

    public cartSaveToStorage(): void {        
        localStorage.setItem("cart", JSON.stringify(this.cart));        
    }

    public cartClear(): void {
        this.cart = new Cart();
        this.cartSaveToStorage();
    }

    public cartAdd(product: IProduct, q: number = 1): void {        
        let record: ICartRecord = this.cart.records.find(r => r.product.id === product.id);

        if (record) {                        
            record.q += q;            
        } else {
            this.cart.records.push({product, q});
        }        
        
        this.cartSaveToStorage();        
    }    

    public cartRemoveRecord(record: ICartRecord): void {
        let index: number = this.cart.records.indexOf(record);
        this.cart.records.splice(index, 1);
        this.cartSaveToStorage();
    }

    private orderSaveToStorage(): void {        
        const data = localStorage.getItem("orders");
        const orders: IOrder[] = data ? JSON.parse(data) : []; 
        let index = orders.findIndex(o => o.id === this.order.id);

        if (index !== -1) {
            orders[index] = this.order; 
        } else {
            orders.push(this.order);
        }

        localStorage.setItem("orders", JSON.stringify(orders));        
    }

    private orderRemoveFromStorage(): void {
        const data = localStorage.getItem("orders");
        const orders: IOrder[] = data ? JSON.parse(data) : []; 
        const index = orders.findIndex(o => o.id === this.order.id);

        if (index !== -1) {
            orders.splice(index, 1);
            localStorage.setItem("orders", JSON.stringify(orders));  
        }
    }

    private orderStartChecking(): void {
        this.orderCheck();
        !this.orderCheckInteval ? this.orderCheckInteval = window.setInterval(() => this.orderCheck(), 10000) : null;
    }    

    private orderCheck(): void {
        if (this.order) {
            this.dataService.ordersCheck(this.order.id).subscribe(res => {
                if (res.statusCode === 200) {
                    this.order = res.data;
                    this.orderSaveToStorage();
                    this.orderCheckTable(); // проверка на пересадку                 
                } else if (res.statusCode === 404) {
                    this.orderRemoveFromStorage();
                    this.initOrder(); // сброс (можно было бы просто занулить, но теоретически возможны случаи, когда в хранилище есть старые заказы)
                } else {
                    console.log(res);
                }
            }, err => {
                console.log(err);
            });
        }
    }

    private orderCheckTable(): void {
        if (this.order.table_id !== this.table.id) {
            this.dataService.tablesOneById(this.order.table_id).subscribe(res => {
                if (res.statusCode === 200) {
                    window.location.href = `${window.location.origin}/table/${res.data.code}`;
                } else { // пересадили на несуществующий стол :-)
                    this.orderRemoveFromStorage();
                    this.initOrder(); // сброс (можно было бы просто занулить, но теоретически возможны случаи, когда в хранилище есть старые заказы)
                }
            }, err => {
                this.appService.showError(err.message);
            });
        }
    }

    public orderCreate(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IOrderCreate = {table_id: this.table.id, cart: this.cart};
            this.dataService.ordersCreate(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.order = res.data;                    
                    this.orderSaveToStorage();
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public orderAdd(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IOrderAdd = {order_id: this.order.id, cart: this.cart};
            this.dataService.ordersAdd(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.order = res.data;
                    this.orderSaveToStorage();
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public orderClose(paymethod: Paymethod): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IOrderClose = {order_id: this.order.id, paymethod};
            this.dataService.ordersClose(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.order = res.data;
                    this.orderSaveToStorage();
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public callWaiter(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IOrderCallWaiter = {
                order_id: this.order ? this.order.id : null,
                table_id: this.order ? null : this.table.id,
            };
            this.dataService.ordersCallWaiter(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.order = res.data;
                    this.orderSaveToStorage();
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public orderSend(): Promise<void> {
        return this.order ? this.orderAdd() : this.orderCreate();
    }
}