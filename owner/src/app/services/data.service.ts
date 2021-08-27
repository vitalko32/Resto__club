import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { filter } from "rxjs/operators";

import { Lang } from "../model/orm/lang.model";
import { ErrorService } from "./error.service";
import { Words } from "../model/orm/words.type";
import { Settings } from "../model/orm/settings.type";
import { IAdminAuthData } from "../model/dto/admin.authdata.interface";
import { IGetAll } from "../model/dto/getall.interface";
import { IAnswer } from "../model/dto/answer.interface";
import { IAdminLogin } from "../model/dto/admin.login.interface";
import { IAdminUpdatePassword } from "../model/dto/admin.updatepassword.interface";
import { IGetChunk } from "../model/dto/getchunk.interface";
import { Restaurant } from "../model/orm/restaurant.model";
import { Currency } from "../model/orm/currency.model";

@Injectable()
export class DataService {
    public authData: IAdminAuthData = null;
    private root: string = "https://back.restclick.vio.net.ua/api/owner"; 
    //private root: string = "https://back.melink.to/api/front"; 
    
    constructor (
        private http: HttpClient,
        private errorService: ErrorService,
    ) {}    
    
    public langsAll(dto: IGetAll): Observable<IAnswer<Lang[]>> {return this.sendRequest("langs/all", dto);}     
    
    public wordsAll(): Observable<IAnswer<Words>> {return this.sendRequest("words/all");}
    
    public settingsAll(): Observable<IAnswer<Settings>> {return this.sendRequest("settings/all");} 
    
    public adminsLogin(dto: IAdminLogin): Observable<IAnswer<IAdminAuthData>> {return this.sendRequest("admins/login", dto);} 
    public adminsLoginByEmail(email: string): Observable<IAnswer<IAdminAuthData>> {return this.sendRequest("admins/login-by-email", {email});}     
    public adminsUpdatePassword(dto: IAdminUpdatePassword): Observable<IAnswer<void>> {return this.sendRequest("admins/update-password", dto, true);}

    public restaurantsChunk(dto: IGetChunk): Observable<IAnswer<Restaurant[]>> {return this.sendRequest("restaurants/chunk", dto, true);}
    
    public currenciesAll(dto: IGetAll): Observable<IAnswer<Currency[]>> {return this.sendRequest("currencies/all", dto, true);}
    
    private sendRequest (url: string, body: Object = {}, authNeeded: boolean = false, withProgress: boolean = false): Observable<any> | null {        
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