import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent } from "@angular/common/http";
import { filter } from "rxjs/operators";

import { IAnswer } from '../model/answer.interface';
import { Admingroup } from '../model/orm/admingroup.model';
import { AdmLang } from '../model/admlang.model';
import { IGetAll } from '../model/dto/getall.interface';
import { IGetChunk } from '../model/dto/getchunk.interface';
import { Admin } from "../model/orm/admin.model";
import { IAuthData } from "../model/authdata.interface";
import { Setting } from "../model/orm/setting.model";
import { Lang } from "../model/orm/lang.model";
import { Wordbook } from "../model/orm/wordbook.model";
import { IPathable } from "../model/pathable.interface";
import { ErrorService } from "./error.service";
import { Mailtemplate } from "../model/orm/mailtemplate.model";
import { Currency } from "../model/orm/currency.model";
import { EmployeeStatus } from "../model/orm/employee.status.model";
import { Restaurant } from "../model/orm/restaurant.model";
import { Employee } from "../model/orm/employee.model";
import { Transaction } from "../model/orm/transaction.model";
import { Hall } from "../model/orm/hall.model";
import { Icon } from "../model/orm/icon.model";
import { Cat } from "../model/orm/cat.model";
import { Product } from "../model/orm/product.model";
import { Serving } from "../model/orm/serving.model";
import { Order } from "../model/orm/order.model";
import { WSServer } from "../model/orm/wsserver.model";

@Injectable()
export class DataService {
    public authData: IAuthData = null;
    private root: string = "https://back.resto-club.com/api/admin";      
    
    constructor (
        private http: HttpClient,
        private errorService: ErrorService,
    ) {}

    public admlangs(): Observable<AdmLang[]> {return this.http.get<AdmLang[]>("/assets/json/admin.languages.json");}    
    
    public updateParam (obj: string, id: number, p: string, v:any): Observable<IAnswer<void>> {return this.sendRequest("objects/update-param", {obj, id, p, v}, true);}    
    public updateEgoisticParam (obj: string, id: number, p: string, v:boolean): Observable<IAnswer<void>> {return this.sendRequest("objects/update-egoistic-param", {obj, id, p, v}, true);}                
    
    public filesImgUpload (fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {return this.sendRequest(`files/img-upload`, fd, true, true);}    
    public filesImgUploadResize (fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {return this.sendRequest(`files/img-upload-resize`, fd, true, true);}

    public settingsAll(dto: IGetAll): Observable<IAnswer<Setting[]>> {return this.sendRequest(`settings/all`, dto, true);}  
    public settingsChunk(dto: IGetChunk): Observable<IAnswer<Setting[]>> {return this.sendRequest("settings/chunk", dto, true);}
    public settingsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`settings/delete/${id}`, null, true);}
    public settingsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("settings/delete-bulk", ids, true);}    
    public settingsCreate(x: Setting): Observable<IAnswer<void>> {return this.sendRequest("settings/create", x, true);}
    
    public admingroupsAll(dto: IGetAll): Observable<IAnswer<Admingroup[]>> {return this.sendRequest("admingroups/all", dto, true);}    
    
    public adminsLogin(email: string, password: string): Observable<IAnswer<IAuthData>> {return this.sendRequest("admins/login", {email, password}, false);}
    public adminsChunk(dto: IGetChunk): Observable<IAnswer<Admin[]>> {return this.sendRequest("admins/chunk", dto, true);}
    public adminsOne(id: number): Observable<IAnswer<Admin>> {return this.sendRequest(`admins/one/${id}`, null, true);}
    public adminsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`admins/delete/${id}`, null, true);}
    public adminsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("admins/delete-bulk", ids, true);}
    public adminsCreate(x: Admin): Observable<IAnswer<void>> {return this.sendRequest("admins/create", x, true);}
    public adminsUpdate(x: Admin): Observable<IAnswer<void>> {return this.sendRequest("admins/update", x, true);}  
    
    public langsAll(dto: IGetAll): Observable<IAnswer<Lang[]>> {return this.sendRequest("langs/all", dto, true);}
    public langsChunk(dto: IGetChunk): Observable<IAnswer<Lang[]>> {return this.sendRequest("langs/chunk", dto, true);}
    public langsOne(id: number): Observable<IAnswer<Lang>> {return this.sendRequest(`langs/one/${id}`, null, true);}
    public langsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`langs/delete/${id}`, null, true);}
    public langsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("langs/delete-bulk", ids, true);}
    public langsCreate(x: Lang): Observable<IAnswer<void>> {return this.sendRequest("langs/create", x, true);}
    public langsUpdate(x: Lang): Observable<IAnswer<void>> {return this.sendRequest("langs/update", x, true);}   

    public wordbooksChunk(dto: IGetChunk): Observable<IAnswer<Wordbook[]>> {return this.sendRequest("wordbooks/chunk", dto, true);}
    public wordbooksOne(id: number): Observable<IAnswer<Wordbook>> {return this.sendRequest(`wordbooks/one/${id}`, null, true);}
    public wordbooksDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`wordbooks/delete/${id}`, null, true);}
    public wordbooksDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("wordbooks/delete-bulk", ids, true);}
    public wordbooksCreate(x: Wordbook): Observable<IAnswer<void>> {return this.sendRequest("wordbooks/create", x, true);}
    public wordbooksUpdate(x: Wordbook): Observable<IAnswer<void>> {return this.sendRequest("wordbooks/update", x, true);}     
    
    public currenciesAll(dto: IGetAll): Observable<IAnswer<Currency[]>> {return this.sendRequest(`currencies/all`, dto, true);}    
    public currenciesChunk(dto: IGetChunk): Observable<IAnswer<Currency[]>> {return this.sendRequest("currencies/chunk", dto, true);}
    public currenciesOne(id: number): Observable<IAnswer<Currency>> {return this.sendRequest(`currencies/one/${id}`, null, true);}
    public currenciesDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`currencies/delete/${id}`, null, true);}
    public currenciesDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("currencies/delete-bulk", ids, true);}
    public currenciesCreate(x: Currency): Observable<IAnswer<void>> {return this.sendRequest("currencies/create", x, true);}
    public currenciesUpdate(x: Currency): Observable<IAnswer<void>> {return this.sendRequest("currencies/update", x, true);} 
    
    public employeesAll(dto: IGetAll): Observable<IAnswer<Employee[]>> {return this.sendRequest(`employees/all`, dto, true);}    
    public employeesChunk(dto: IGetChunk): Observable<IAnswer<Employee[]>> {return this.sendRequest("employees/chunk", dto, true);}
    public employeesOne(id: number): Observable<IAnswer<Employee>> {return this.sendRequest(`employees/one/${id}`, null, true);}
    public employeesDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`employees/delete/${id}`, null, true);}
    public employeesDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("employees/delete-bulk", ids, true);}
    public employeesCreate(x: Employee): Observable<IAnswer<void>> {return this.sendRequest("employees/create", x, true);}
    public employeesUpdate(x: Employee): Observable<IAnswer<void>> {return this.sendRequest("employees/update", x, true);}     

    public employeeStatusesAll(dto: IGetAll): Observable<IAnswer<EmployeeStatus[]>> {return this.sendRequest(`employee-statuses/all`, dto, true);}    
    public employeeStatusesChunk(dto: IGetChunk): Observable<IAnswer<EmployeeStatus[]>> {return this.sendRequest("employee-statuses/chunk", dto, true);}
    public employeeStatusesOne(id: number): Observable<IAnswer<EmployeeStatus>> {return this.sendRequest(`employee-statuses/one/${id}`, null, true);}
    public employeeStatusesDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`employee-statuses/delete/${id}`, null, true);}
    public employeeStatusesDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("employee-statuses/delete-bulk", ids, true);}
    public employeeStatusesCreate(x: EmployeeStatus): Observable<IAnswer<void>> {return this.sendRequest("employee-statuses/create", x, true);}
    public employeeStatusesUpdate(x: EmployeeStatus): Observable<IAnswer<void>> {return this.sendRequest("employee-statuses/update", x, true);} 
    
    public restaurantsAll(dto: IGetAll): Observable<IAnswer<Restaurant[]>> {return this.sendRequest(`restaurants/all`, dto, true);}    
    public restaurantsAllWithCats(dto: IGetAll): Observable<IAnswer<Restaurant[]>> {return this.sendRequest(`restaurants/all-with-cats`, dto, true);}    
    public restaurantsChunk(dto: IGetChunk): Observable<IAnswer<Restaurant[]>> {return this.sendRequest("restaurants/chunk", dto, true);}
    public restaurantsOne(id: number): Observable<IAnswer<Restaurant>> {return this.sendRequest(`restaurants/one/${id}`, null, true);}
    public restaurantsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`restaurants/delete/${id}`, null, true);}
    public restaurantsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("restaurants/delete-bulk", ids, true);}
    public restaurantsCreate(x: Restaurant): Observable<IAnswer<void>> {return this.sendRequest("restaurants/create", x, true);}
    public restaurantsUpdate(x: Restaurant): Observable<IAnswer<void>> {return this.sendRequest("restaurants/update", x, true);}     

    public hallsAll(dto: IGetAll): Observable<IAnswer<Hall[]>> {return this.sendRequest(`halls/all`, dto, true);}        
    public hallsChunk(dto: IGetChunk): Observable<IAnswer<Hall[]>> {return this.sendRequest("halls/chunk", dto, true);}
    public hallsOne(id: number): Observable<IAnswer<Hall>> {return this.sendRequest(`halls/one/${id}`, null, true);}
    public hallsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`halls/delete/${id}`, null, true);}
    public hallsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("halls/delete-bulk", ids, true);}
    public hallsCreate(x: Hall): Observable<IAnswer<void>> {return this.sendRequest("halls/create", x, true);}
    public hallsUpdate(x: Hall): Observable<IAnswer<void>> {return this.sendRequest("halls/update", x, true);}     

    public transactionsChunk(dto: IGetChunk): Observable<IAnswer<Transaction[]>> {return this.sendRequest("transactions/chunk", dto, true);}

    public iconsAll(dto: IGetAll): Observable<IAnswer<Icon[]>> {return this.sendRequest(`icons/all`, dto, true);}    
    public iconsChunk(dto: IGetChunk): Observable<IAnswer<Icon[]>> {return this.sendRequest("icons/chunk", dto, true);}
    public iconsOne(id: number): Observable<IAnswer<Icon>> {return this.sendRequest(`icons/one/${id}`, null, true);}
    public iconsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`icons/delete/${id}`, null, true);}
    public iconsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("icons/delete-bulk", ids, true);}
    public iconsCreate(x: Icon): Observable<IAnswer<void>> {return this.sendRequest("icons/create", x, true);}
    public iconsUpdate(x: Icon): Observable<IAnswer<void>> {return this.sendRequest("icons/update", x, true);}    

    public catsAll(dto: IGetAll): Observable<IAnswer<Cat[]>> {return this.sendRequest(`cats/all`, dto, true);}    
    public catsChunk(dto: IGetChunk): Observable<IAnswer<Cat[]>> {return this.sendRequest("cats/chunk", dto, true);}
    public catsOne(id: number): Observable<IAnswer<Cat>> {return this.sendRequest(`cats/one/${id}`, null, true);}
    public catsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`cats/delete/${id}`, null, true);}
    public catsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("cats/delete-bulk", ids, true);}
    public catsCreate(x: Cat): Observable<IAnswer<void>> {return this.sendRequest("cats/create", x, true);}
    public catsUpdate(x: Cat): Observable<IAnswer<void>> {return this.sendRequest("cats/update", x, true);}    

    public productsAll(dto: IGetAll): Observable<IAnswer<Product[]>> {return this.sendRequest(`products/all`, dto, true);}    
    public productsChunk(dto: IGetChunk): Observable<IAnswer<Product[]>> {return this.sendRequest("products/chunk", dto, true);}
    public productsOne(id: number): Observable<IAnswer<Product>> {return this.sendRequest(`products/one/${id}`, null, true);}
    public productsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`products/delete/${id}`, null, true);}
    public productsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("products/delete-bulk", ids, true);}
    public productsCreate(x: Product): Observable<IAnswer<void>> {return this.sendRequest("products/create", x, true);}
    public productsUpdate(x: Product): Observable<IAnswer<void>> {return this.sendRequest("products/update", x, true);}  

    public servingsAll(dto: IGetAll): Observable<IAnswer<Serving[]>> {return this.sendRequest(`servings/all`, dto, true);}    
    public servingsChunk(dto: IGetChunk): Observable<IAnswer<Serving[]>> {return this.sendRequest("servings/chunk", dto, true);}
    public servingsOne(id: number): Observable<IAnswer<Serving>> {return this.sendRequest(`servings/one/${id}`, null, true);}
    public servingsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`servings/delete/${id}`, null, true);}
    public servingsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("servings/delete-bulk", ids, true);}
    public servingsCreate(x: Serving): Observable<IAnswer<void>> {return this.sendRequest("servings/create", x, true);}
    public servingsUpdate(x: Serving): Observable<IAnswer<void>> {return this.sendRequest("servings/update", x, true);}  
        
    public ordersChunk(dto: IGetChunk): Observable<IAnswer<Order[]>> {return this.sendRequest("orders/chunk", dto, true);}
    public ordersOne(id: number): Observable<IAnswer<Order>> {return this.sendRequest(`orders/one/${id}`, null, true);}
    public ordersDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`orders/delete/${id}`, null, true);}
    public ordersDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("orders/delete-bulk", ids, true);}    
    public ordersUpdate(x: Order): Observable<IAnswer<void>> {return this.sendRequest("orders/update", x, true);}     
    
    public mailtemplatesChunk(dto: IGetChunk): Observable<IAnswer<Mailtemplate[]>> {return this.sendRequest("mailtemplates/chunk", dto, true);}
    public mailtemplatesOne(id: number): Observable<IAnswer<Mailtemplate>> {return this.sendRequest(`mailtemplates/one/${id}`, null, true);}
    public mailtemplatesDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`mailtemplates/delete/${id}`, null, true);}
    public mailtemplatesDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("mailtemplates/delete-bulk", ids, true);}
    public mailtemplatesCreate(x: Mailtemplate): Observable<IAnswer<void>> {return this.sendRequest("mailtemplates/create", x, true);}
    public mailtemplatesUpdate(x: Mailtemplate): Observable<IAnswer<void>> {return this.sendRequest("mailtemplates/update", x, true);}     

    public wsserversAll(dto: IGetAll): Observable<IAnswer<WSServer[]>> {return this.sendRequest(`wsservers/all`, dto, true);}    
    public wsserversChunk(dto: IGetChunk): Observable<IAnswer<WSServer[]>> {return this.sendRequest("wsservers/chunk", dto, true);}
    public wsserversOne(id: number): Observable<IAnswer<WSServer>> {return this.sendRequest(`wsservers/one/${id}`, null, true);}
    public wsserversDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`wsservers/delete/${id}`, null, true);}
    public wsserversDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("wsservers/delete-bulk", ids, true);}
    public wsserversCreate(x: WSServer): Observable<IAnswer<void>> {return this.sendRequest("wsservers/create", x, true);}
    public wsserversUpdate(x: WSServer): Observable<IAnswer<void>> {return this.sendRequest("wsservers/update", x, true);}  
    
    private sendRequest (url: string, body: Object = {}, authNeeded: boolean = true, withProgress: boolean = false): Observable<any> | null {        
        let headers: HttpHeaders | null = null;

        if (authNeeded) {
            headers = new HttpHeaders({token: this.authData.token});
        }
        
        if (withProgress) {
            return this.http
                .post (`${this.root}/${url}`, body, {headers, observe: "events", reportProgress: true})
                .pipe(filter(res => this.errorService.processResponse(res)));
        } else {
            return this.http
                .post (`${this.root}/${url}`, body, {headers})
                .pipe(filter(res => this.errorService.processResponse(res)));                    
        }                  
    }    
}