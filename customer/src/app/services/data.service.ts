import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Words } from "../model/orm/words.type";
import { IGetAll } from "../model/dto/getall.interface";
import { IAnswer } from "../model/dto/answer.interface";
import { IGetChunk } from "../model/dto/getchunk.interface";
import { ITable } from "../model/orm/table.interface";
import { ICat } from "../model/orm/cat.interface";
import { IProduct } from "../model/orm/product.interface";
import { IServing } from "../model/orm/serving.interface";
import { IOrderCreate } from "../model/dto/order.create.interface";
import { IOrderAdd } from "../model/dto/order.add.interface";
import { IOrder } from "../model/orm/order.interface";
import { IOrderClose } from "../model/dto/order.close.interface";
import { IOrderCallWaiter } from "../model/dto/order.callwaiter.interface";

@Injectable()
export class DataService {    
    private root: string = "https://back.restclick.vio.net.ua/api/customer";     
    
    constructor (private http: HttpClient) {}
    
    public tablesOneByCode(code: string): Observable<IAnswer<ITable>> {return this.sendRequest(`tables/oneByCode/${code}`);}
    public tablesOneById(id: number): Observable<IAnswer<ITable>> {return this.sendRequest(`tables/oneById/${id}`);}
    
    public wordsAll(dto: IGetAll): Observable<IAnswer<Words>> {return this.sendRequest(`words/all`, dto);}    

    public servingsAll(dto: IGetAll): Observable<IAnswer<IServing[]>> {return this.sendRequest(`servings/all`, dto);}    
    
    public catsAll(dto: IGetAll): Observable<IAnswer<ICat[]>> {return this.sendRequest(`cats/all`, dto);}    
    public catsOne(id: number): Observable<IAnswer<ICat>> {return this.sendRequest(`cats/one/${id}`);}    
    
    public productsChunk(dto: IGetChunk): Observable<IAnswer<IProduct[]>> {return this.sendRequest("products/chunk", dto);}
    public productsOne(id: number): Observable<IAnswer<IProduct>> {return this.sendRequest(`products/one/${id}`);}    
    public productsLike(id: number): Observable<IAnswer<void>> {return this.sendRequest(`products/like/${id}`);}    

    public ordersCreate(dto: IOrderCreate): Observable<IAnswer<IOrder>> {return this.sendRequest("orders/create", dto);}
    public ordersAdd(dto: IOrderAdd): Observable<IAnswer<IOrder>> {return this.sendRequest("orders/add", dto);}
    public ordersCheck(id: number): Observable<IAnswer<IOrder>> {return this.sendRequest(`orders/check/${id}`);}
    public ordersClose(dto: IOrderClose): Observable<IAnswer<IOrder>> {return this.sendRequest("orders/close", dto);}
    public ordersCallWaiter(dto: IOrderCallWaiter): Observable<IAnswer<IOrder>> {return this.sendRequest("orders/call-waiter", dto);}
    
    private sendRequest (url: string, body: Object = null): Observable<any> {        
        return this.http.post (`${this.root}/${url}`, body);                          
    }   
}