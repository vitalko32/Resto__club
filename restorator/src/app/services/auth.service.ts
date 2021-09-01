import { Injectable } from "@angular/core";
import { IEmployeeAuthData } from "../model/dto/employee.authdata.interface";
import { IEmployeeLogin } from "../model/dto/employee.login.interface";
import { Employee } from "../model/orm/employee.model";
import { DataService } from './data.service';

@Injectable()
export class AuthService {
    constructor(private dataService: DataService) {
        let data: string = localStorage.getItem("authdata");

        if (data) {            
            this.buildAuthData(JSON.parse(data));
        }
    }

    get authData(): IEmployeeAuthData {return this.dataService.authData;}
    set authData(v: IEmployeeAuthData) {this.dataService.authData = v;}
    
    private buildAuthData(data: IEmployeeAuthData): void {
        this.authData = {token: data.token, employee: new Employee().build(data.employee)};
    }
    
    public login(dto: IEmployeeLogin): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.employeesLogin(dto).subscribe(res => {                
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

    public loginByEmail(email: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.employeesLoginByEmail(email).subscribe(res => {
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
