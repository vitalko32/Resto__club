import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Words } from "../model/orm/words.type";
import { IGetAll } from "../model/dto/getall.interface";
import { IAnswer } from "../model/dto/answer.interface";
import { IGetChunk } from "../model/dto/getchunk.interface";
import { ITable } from "../model/orm/table.interface";
import { ICat } from "../model/orm/cat.interface";

@Injectable()
export class DataService {    
    private root: string = "https://back.restclick.vio.net.ua/api/customer";     
    
    constructor (private http: HttpClient) {}
    
    public tablesOne(code: string): Observable<IAnswer<ITable>> {return this.sendRequest(`tables/one/${code}`);}
    
    public wordsAll(restaurant_id: number): Observable<IAnswer<Words>> {return this.sendRequest(`words/all/${restaurant_id}`);}    
    
    public catsAll(dto: IGetAll): Observable<IAnswer<ICat[]>> {return this.sendRequest(`cats/all`, dto);}    
    public catsOne(id: number): Observable<IAnswer<ICat>> {return this.sendRequest(`cats/one/${id}`);}
    
    /*
    public productsChunk(dto: IGetChunk): Observable<IAnswer<Product[]>> {return this.sendRequest("products/chunk", dto);}
    public productsOne(id: number): Observable<IAnswer<Product>> {return this.sendRequest(`products/one/${id}`);}
    */
    
    private sendRequest (url: string, body: Object = null): Observable<any> {        
        return this.http.post (`${this.root}/${url}`, body);                          
    }   
}