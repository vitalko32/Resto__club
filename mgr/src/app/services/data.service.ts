import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent } from "@angular/common/http";
import { filter } from "rxjs/operators";

import { IAnswer } from '../model/answer.interface';
import { Admingroup } from '../model/orm/admingroup.model';
import { AdmLang } from '../model/admlang.model';
import { IGetallDTO } from '../model/dto/getall.dto';
import { IGetchunkDTO } from '../model/dto/getchunk.dto';
import { Admin } from "../model/orm/admin.model";
import { IAuthData } from "../model/authdata.interface";
import { Setting } from "../model/orm/setting.model";
import { Lang } from "../model/orm/lang.model";
import { Wordbook } from "../model/orm/wordbook.model";
import { IPathable } from "../model/pathable.interface";
import { ErrorService } from "./error.service";
import { Mailtemplate } from "../model/orm/mailtemplate.model";

@Injectable()
export class DataService {
    public authData: IAuthData = null;
    private root: string = "https://back.restclick.vio.net.ua/api/admin";   
    //private root: string = "https://back.melink.to/api/admin";   
    
    constructor (
        private http: HttpClient,
        private errorService: ErrorService,
    ) {}

    public admlangs(): Observable<AdmLang[]> {return this.http.get<AdmLang[]>("/assets/json/admin.languages.json");}    
    
    public updateParam (obj: string, id: number, p: string, v:any): Observable<IAnswer<void>> {return this.sendRequest("objects/update-param", {obj, id, p, v}, true);}    
    public updateEgoisticParam (obj: string, id: number, p: string, v:boolean): Observable<IAnswer<void>> {return this.sendRequest("objects/update-egoistic-param", {obj, id, p, v}, true);}                
    
    public filesUploadImg (fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {return this.sendRequest(`files/upload-img`, fd, true, true);}    

    public settingsAll(dto: IGetallDTO): Observable<IAnswer<Setting[]>> {return this.sendRequest(`settings/all`, dto, true);}  
    public settingsChunk(dto: IGetchunkDTO): Observable<IAnswer<Setting[]>> {return this.sendRequest("settings/chunk", dto, true);}
    public settingsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`settings/delete/${id}`, null, true);}
    public settingsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("settings/delete-bulk", ids, true);}    
    public settingsCreate(x: Setting): Observable<IAnswer<void>> {return this.sendRequest("settings/create", x, true);}
    
    public admingroupsAll(dto: IGetallDTO): Observable<IAnswer<Admingroup[]>> {return this.sendRequest("admingroups/all", dto, true);}    
    
    public adminsLogin(email: string, password: string): Observable<IAnswer<IAuthData>> {return this.sendRequest("admins/login", {email, password}, false);}
    public adminsChunk(dto: IGetchunkDTO): Observable<IAnswer<Admin[]>> {return this.sendRequest("admins/chunk", dto, true);}
    public adminsOne(id: number): Observable<IAnswer<Admin>> {return this.sendRequest(`admins/one/${id}`, null, true);}
    public adminsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`admins/delete/${id}`, null, true);}
    public adminsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("admins/delete-bulk", ids, true);}
    public adminsCreate(x: Admin): Observable<IAnswer<void>> {return this.sendRequest("admins/create", x, true);}
    public adminsUpdate(x: Admin): Observable<IAnswer<void>> {return this.sendRequest("admins/update", x, true);}  
    
    public langsAll(dto: IGetallDTO): Observable<IAnswer<Lang[]>> {return this.sendRequest("langs/all", dto, true);}
    public langsChunk(dto: IGetchunkDTO): Observable<IAnswer<Lang[]>> {return this.sendRequest("langs/chunk", dto, true);}
    public langsOne(id: number): Observable<IAnswer<Lang>> {return this.sendRequest(`langs/one/${id}`, null, true);}
    public langsDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`langs/delete/${id}`, null, true);}
    public langsDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("langs/delete-bulk", ids, true);}
    public langsCreate(x: Lang): Observable<IAnswer<void>> {return this.sendRequest("langs/create", x, true);}
    public langsUpdate(x: Lang): Observable<IAnswer<void>> {return this.sendRequest("langs/update", x, true);}   

    public wordbooksChunk(dto: IGetchunkDTO): Observable<IAnswer<Wordbook[]>> {return this.sendRequest("wordbooks/chunk", dto, true);}
    public wordbooksOne(id: number): Observable<IAnswer<Wordbook>> {return this.sendRequest(`wordbooks/one/${id}`, null, true);}
    public wordbooksDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`wordbooks/delete/${id}`, null, true);}
    public wordbooksDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("wordbooks/delete-bulk", ids, true);}
    public wordbooksCreate(x: Wordbook): Observable<IAnswer<void>> {return this.sendRequest("wordbooks/create", x, true);}
    public wordbooksUpdate(x: Wordbook): Observable<IAnswer<void>> {return this.sendRequest("wordbooks/update", x, true);}         
    
    public mailtemplatesChunk(dto: IGetchunkDTO): Observable<IAnswer<Mailtemplate[]>> {return this.sendRequest("mailtemplates/chunk", dto, true);}
    public mailtemplatesOne(id: number): Observable<IAnswer<Mailtemplate>> {return this.sendRequest(`mailtemplates/one/${id}`, null, true);}
    public mailtemplatesDelete(id: number): Observable<IAnswer<void>> {return this.sendRequest(`mailtemplates/delete/${id}`, null, true);}
    public mailtemplatesDeleteBulk(ids: number[]): Observable<IAnswer<void>> {return this.sendRequest("mailtemplates/delete-bulk", ids, true);}
    public mailtemplatesCreate(x: Mailtemplate): Observable<IAnswer<void>> {return this.sendRequest("mailtemplates/create", x, true);}
    public mailtemplatesUpdate(x: Mailtemplate): Observable<IAnswer<void>> {return this.sendRequest("mailtemplates/update", x, true);}     
    
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