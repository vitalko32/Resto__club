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

@Injectable()
export class DataService {
    public authData: BehaviorSubject<IEmployeeAuthData> = new BehaviorSubject(null);
    private root: string = "https://back.restclick.vio.net.ua/api/restorator";     
    
    constructor (
        private http: HttpClient,
        private errorService: ErrorService,
    ) {}    
    
    public langsAll(dto: IGetAll): Observable<IAnswer<Lang[]>> {return this.sendRequest("langs/all", dto);}     
    
    public wordsAll(): Observable<IAnswer<Words>> {return this.sendRequest("words/all");}
    
    public settingsAll(): Observable<IAnswer<Settings>> {return this.sendRequest("settings/all");} 
    
    public employeesLogin(dto: IEmployeeLogin): Observable<IAnswer<IEmployeeAuthData>> {return this.sendRequest("employees/login", dto);} 
    public employeesLoginByEmail(email: string): Observable<IAnswer<IEmployeeAuthData>> {return this.sendRequest("employees/login-by-email", {email});}         
    public employeesCheck(id: number): Observable<IAnswer<Employee>> {return this.sendRequest(`employees/check/${id}`, null, true);}
    public employeeSetStatus(dto: IEmployeeSetStatus): Observable<IAnswer<void>> {return this.sendRequest("employees/set-status", dto, true);}

    public employeeStatusesAll(dto: IGetAll): Observable<IAnswer<EmployeeStatus[]>> {return this.sendRequest(`employee-statuses/all`, dto, true);}    
    
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