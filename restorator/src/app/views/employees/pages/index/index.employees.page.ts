import { Component, OnInit } from "@angular/core";
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
    selector: "index-employees-page",
    templateUrl: "index.employees.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class IndexEmployeesPage implements OnInit {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public elLoading: boolean = false;
    public elSortingVariants: any[][] = // для мобильной верстки
        [["created_at", 1], ["created_at", -1], ["name", 1], ["name", -1], ["employee_status_id", 1], ["employee_status_id", -1]];    
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,    
        private employeeRepository: EmployeeRepository,   
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get el(): Employee[] {return this.employeeRepository.xl;}
    get elCurrentPart(): number {return this.employeeRepository.chunkCurrentPart;}
    set elCurrentPart(v: number) {this.employeeRepository.chunkCurrentPart = v;}
    get elAllLength(): number {return this.employeeRepository.allLength;}  
    get elLength(): number {return this.employeeRepository.chunkLength;}   
    get elFilterCreatedAt(): Date[] {return this.employeeRepository.filterCreatedAt;}  
    set elFilterCreatedAt(v: Date[]) {this.employeeRepository.filterCreatedAt = v;}
    get elFilterName(): string {return this.employeeRepository.filterName;}
    set elFilterName(v: string) {this.employeeRepository.filterName = v;}
    get elSortBy(): string {return this.employeeRepository.sortBy;}
    get elSortDir(): number {return this.employeeRepository.sortDir;}
    set elSortBy(v: string) {this.employeeRepository.sortBy = v;}
    set elSortDir(v: number) {this.employeeRepository.sortDir = v;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();      
        this.initEmployees();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-employees"]["title-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-employees"]["title-index"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initEmployees(): Promise<void> {
        try {
            this.elLoading = true;
            this.employeeRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            await this.employeeRepository.loadChunk();                     
            await this.appService.pause(500);
            this.elLoading = false;       
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.elSortBy === sortBy) {
            this.elSortDir *= -1;
        } else {
            this.elSortBy = sortBy;
            this.elSortDir = 1;
        }

        this.initEmployees();
    }

    public setSorting(i: string): void {
        let sorting = this.elSortingVariants[parseInt(i)];
        this.elSortBy = sorting[0];
        this.elSortDir = sorting[1];
        this.initEmployees();
    }

    public onDelete(e: Employee): void {
        this.deleteId = e.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${e.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.elLoading = true;            
            await this.employeeRepository.delete(this.deleteId);
            this.initEmployees();
        } catch (err) {
            this.appService.showError(err);
            this.elLoading = false;
        }
    }  
}