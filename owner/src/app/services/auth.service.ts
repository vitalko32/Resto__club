import { Injectable } from "@angular/core";
import { IAdminAuthData } from "../model/dto/admin.authdata.interface";
import { IAdminGoogleData } from "../model/dto/admin.googledata.interface";
import { IAdminLogin } from "../model/dto/admin.login.interface";
import { Admin } from "../model/orm/admin.model";
import { DataService } from './data.service';

@Injectable()
export class AuthService {
    constructor(private dataService: DataService) {
        let data: string = localStorage.getItem("authdata");

        if (data) {            
            this.buildAuthData(JSON.parse(data));
        }
    }

    get authData(): IAdminAuthData {return this.dataService.authData;}
    set authData(v: IAdminAuthData) {this.dataService.authData = v;}
    
    private buildAuthData(data: IAdminAuthData): void {
        this.authData = {token: data.token, admin: new Admin().build(data.admin)};
    }
    
    public login(dto: IAdminLogin): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.adminsLogin(dto).subscribe(res => {                
                if (res.statusCode === 200) {    
                    this.buildAuthData(res.data);                                
                    this.save();                                        
                }

                resolve(res.statusCode);
            }, err => {
                reject(err.message);                
            });
        });        
    }

    public loginWithGoogle(dto: IAdminGoogleData): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.adminsLoginWithGoogle(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.buildAuthData(res.data); 
                    this.save();    
                }
                
                resolve(res.statusCode);
            }, err => {
                reject(err.message);
            });
        });
    }    

    /*public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.customersOne(this.authData.customer.id).subscribe(res => {
                if (res.statusCode === 200) {
                    this.authData.customer = new Customer().build(res.data);                    
                    this.save();
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }*/
       
    /*
    public update(data: Customer): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.customersUpdate(data).subscribe(res => {                
                if (res.statusCode === 200) {                
                    delete data.password;
                    this.authData.customer = new Customer().build(data);                    
                    this.save();  
                } 

                resolve(res.statusCode);
            }, err => {                
                reject(err.message);                
            });
        }); 
    }    
    */
        
    public logout(): void {
        this.authData = null;
        localStorage.removeItem("authdata");         
    }

    public save(): void {
        if (this.authData) {
            localStorage.setItem("authdata", JSON.stringify(this.authData));            
        } 
    }    
}
