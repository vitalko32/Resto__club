import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IEmployeeAuthData } from "../model/dto/employee.authdata.interface";
import { IEmployeeLogin } from "../model/dto/employee.login.interface";
import { Employee } from "../model/orm/employee.model";
import { DataService } from './data.service';

@Injectable()
export class AuthService {
    private interval: number = null;
    
    constructor(private dataService: DataService) {
        let data: string = localStorage.getItem("authdata");
        data ? this.init(JSON.parse(data)) : null;        
    }

    get authData(): BehaviorSubject<IEmployeeAuthData> {return this.dataService.authData;}    
    
    private init(data: IEmployeeAuthData): void {        
        this.authData.next({token: data.token, employee: new Employee().build(data.employee)});        
        this.interval = window.setInterval(() => this.load().catch(err => console.log(err)), 10*1000); // периодически проверяем актуальность аккаунта и получаем данные пользователя и ресторана
    }
    
    public login(dto: IEmployeeLogin): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.employeesLogin(dto).subscribe(res => {                
                if (res.statusCode === 200) {    
                    this.init(res.data);                                
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
                    this.init(res.data); 
                    this.save();    
                }
                
                resolve(res.statusCode);
            }, err => {
                reject(err.message);
            });
        });
    }    

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {            
            this.dataService.employeesOne(this.authData.value.employee.id).subscribe(res => {
                if (res.statusCode === 200) {                    
                    this.authData.next({token: this.authData.value.token, employee: new Employee().build(res.data)});
                    this.save();
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {                
                reject(err.message);
            });
        });
    }
        
    public logout(): void {
        this.authData.next(null);
        window.clearInterval(this.interval);
        localStorage.removeItem("authdata");         
    }

    public save(): void {
        if (this.authData.value) {
            localStorage.setItem("authdata", JSON.stringify(this.authData.value));            
        } 
    }    
}
