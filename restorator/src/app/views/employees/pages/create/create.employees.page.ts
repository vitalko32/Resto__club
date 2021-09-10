import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { EmployeeRepository } from "src/app/services/repositories/employee.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-employees-page",
    templateUrl: "create.employees.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CreateEmployeesPage implements OnInit {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public employee: Employee = null;
    public formLoading: boolean = false; 
    public formErrorEmail: boolean = false;
    public formErrorEmailDuplication: boolean = false;    
    public formErrorPassword: boolean = false;    
    public formErrorName: boolean = false;       
    public createConfirmActive: boolean = false; 

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,    
        private employeeRepository: EmployeeRepository,   
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();      
        this.initEmployee();        
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-employees"]["title-create"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-employees"]["title-create"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private initEmployee(): void {
        this.employee = new Employee().init(this.authService.authData.value.employee.restaurant_id);
    }

    public onCreate(): void {
        if (this.validate()) {
            this.createConfirmActive = true;
        }
    }

    public async create(): Promise<void> {
        try {            
            this.formLoading = true;
            this.formErrorEmailDuplication = false;
            const statusCode = await this.employeeRepository.create(this.employee);
            this.formLoading = false;            

            if (statusCode === 200) {
                this.authService.check();
                this.router.navigateByUrl("/employees");
            } else if (statusCode === 409) {
                this.formErrorEmailDuplication = true;
            } else {
                this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
            }
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }

    private validate(): boolean {
        let error = false;
        this.employee.email = this.appService.trim(this.employee.email);        
        this.employee.password = this.appService.trim(this.employee.password);        
        this.employee.name = this.appService.trim(this.employee.name);    
        
        if (!this.employee.email.length || !this.appService.validateEmail(this.employee.email)) {
            this.formErrorEmail = true;
            error = true;
        } else {
            this.formErrorEmail = false;
        }

        if (!this.employee.password.length) {
            this.formErrorPassword = true;
            error = true;
        } else {
            this.formErrorPassword = false;
        }

        if (!this.employee.name.length) {
            this.formErrorName = true;
            error = true;
        } else {
            this.formErrorName = false;
        }

        return !error;
    }
}