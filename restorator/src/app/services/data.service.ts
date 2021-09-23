import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { filter } from "rxjs/operators";

import { Lang } from "../model/orm/lang.model";
import { ErrorService } from "./error.service";
import { Words } from "../model/orm/words.type";
import { Settings } from "../model/orm/settings.type";
import { IGetAll } from "../model/dto/getall.interface";
import { IAnswer } from "../model/dto/answer.interface";
import { IGetChunk } from "../model/dto/getchunk.interface";
import { IEmployeeAuthData } from "../model/dto/employee.authdata.interface";
import { IEmployeeLogin } from "../model/dto/employee.login.interface";
import { Employee } from "../model/orm/employee.model";
import { EmployeeStatus } from "../model/orm/employee.status.model";
import { IEmployeeSetStatus } from "../model/dto/employee.setstatus.interface";
import { IEmployeeConfirm } from "../model/dto/employee.confirm.interface";
import { IEmployeeUpdatePassword } from "../model/dto/employee.updatepassword.interface";
import { Hall } from "../model/orm/hall.model";
import { Cat } from "../model/orm/cat.model";
import { Icon } from "../model/orm/icon.model";
import { Product } from "../model/orm/product.model";
import { IProductUpdatePos } from "../model/dto/product.updatepos.interface";

@Injectable()
export class DataService {
    public authData: BehaviorSubject<IEmployeeAuthData> = new BehaviorSubject(null);
    private root: string = "https://back.restclick.vio.net.ua/api/restorator";     
    
    constructor (
        private http: HttpClient,
        private errorService: ErrorService,
    ) {}   
    
    public updateParam (obj: string, id: number, p: string, v:any): Observable<IAnswer<void>> {return this.sendRequest("objects/update-param", {obj, id, p, v}, true);}    
    
    public langsAll(dto: IGetAll): Observable<IAnswer<Lang[]>> {return this.sendRequest("langs/all", dto);}     
    
    public wordsAll(): Observable<IAnswer<Words>> {return this.sendRequest("words/all");}
    
    public settingsAll(): Observable<IAnswer<Settings>> {return this.sendRequest("settings/all");} 
    
    public employeesLogin(dto: IEmployeeLogin): Observable<IAnswer<IEmployeeAuthData>> {return this.sendRequest("employees/login", dto);} 
    public employeesLoginByEmail(email: string): Observable<IAnswer<IEmployeeAuthData>> {return this.sendRequest("employees/login-by-email", {email});}         
    public employeesCheck(id: number): Observable<IAnswer<Employee>> {return this.sendRequest(`employees/check/${id}`, null, true);}
    public employeesConfirm(dto: IEmployeeConfirm): Observable<IAnswer<void>> {return this.sendRequest(`employees/confirm`, dto, true);}
    public employeeSetStatus(dto: IEmployeeSetStatus): Observable<IAnswer<void>> {return this.sendRequest("employees/set-status", dto, true);}
    public employeesChunk(dto: IGetChunk): Observable<IAnswer<Employee[]>> {return this.sendRequest("employees/chunk", dto, true);}
    public employeesDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`employees/delete/${id}`, null, true);}
    public employeesCreate(x: Employee): Observable<IAnswer<void>> {return this.sendRequest("employees/create", x, true);}
    public employeesOne(id: number): Observable<IAnswer<Employee>> {return this.sendRequest(`employees/one/${id}`, null, true);}        
    public employeesUpdate(x: Employee): Observable<IAnswer<void>> {return this.sendRequest("employees/update", x, true);}    
    public employeesUpdatePassword(dto: IEmployeeUpdatePassword): Observable<IAnswer<void>> {return this.sendRequest("employees/update-password", dto, true);}

    public employeeStatusesAll(dto: IGetAll): Observable<IAnswer<EmployeeStatus[]>> {return this.sendRequest(`employee-statuses/all`, dto, true);}    

    public hallsAll(dto: IGetAll): Observable<IAnswer<Hall[]>> {return this.sendRequest(`halls/all`, dto, true);}    
    public hallsChunk(dto: IGetChunk): Observable<IAnswer<Hall[]>> {return this.sendRequest("halls/chunk", dto, true);}
    public hallsOne(id: number): Observable<IAnswer<Hall>> {return this.sendRequest(`halls/one/${id}`, null, true);}
    public hallsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`halls/delete/${id}`, null, true);}    
    public hallsCreate(x: Hall): Observable<IAnswer<void>> {return this.sendRequest("halls/create", x, true);}
    public hallsUpdate(x: Hall): Observable<IAnswer<Hall>> {return this.sendRequest("halls/update", x, true);}   
    
    public catsAll(dto: IGetAll): Observable<IAnswer<Cat[]>> {return this.sendRequest(`cats/all`, dto, true);}    
    public catsChunk(dto: IGetChunk): Observable<IAnswer<Cat[]>> {return this.sendRequest("cats/chunk", dto, true);}
    public catsOne(id: number): Observable<IAnswer<Cat>> {return this.sendRequest(`cats/one/${id}`, null, true);}
    public catsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`cats/delete/${id}`, null, true);}    
    public catsCreate(x: Cat): Observable<IAnswer<void>> {return this.sendRequest("cats/create", x, true);}
    public catsUpdate(x: Cat): Observable<IAnswer<void>> {return this.sendRequest("cats/update", x, true);}   

    public iconsAll(dto: IGetAll): Observable<IAnswer<Icon[]>> {return this.sendRequest(`icons/all`, dto, true);}   
    
    public productsChunk(dto: IGetChunk): Observable<IAnswer<Product[]>> {return this.sendRequest("products/chunk", dto, true);}
    public productsOne(id: number): Observable<IAnswer<Product>> {return this.sendRequest(`products/one/${id}`, null, true);}
    public productsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`products/delete/${id}`, null, true);}    
    public productsCreate(x: Product): Observable<IAnswer<void>> {return this.sendRequest("products/create", x, true);}
    public productsUpdate(x: Product): Observable<IAnswer<void>> {return this.sendRequest("products/update", x, true);}  
    public productsUpdatePositions(dto: IProductUpdatePos[]): Observable<IAnswer<void>> {return this.sendRequest("products/update-positions", dto, true);}
    
    private sendRequest (url: string, body: Object = {}, authNeeded: boolean = false, withProgress: boolean = false): Observable<any> | null {        
        let headers: HttpHeaders | null = null;

        if (authNeeded) {
            headers = new HttpHeaders({token: this.authData.value.token});
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