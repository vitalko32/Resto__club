import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { Hall } from "src/app/model/orm/hall.model";
import { Table } from "src/app/model/orm/table.model";
import { EmployeeRepository } from "src/app/services/repositories/employee.repository";
import { Employee } from "src/app/model/orm/employee.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";

@Component({
    selector: "index-all-orders-page",
    templateUrl: "index.all.orders.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class IndexAllOrdersPage implements OnInit, OnDestroy {
    public ready: boolean = false;
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public olLoading: boolean = false;
    public olSortingVariants: any[][] = // для мобильной верстки
        [["created_at", 1], ["created_at", -1], ["sum", 1], ["sum", -1]];   
    public olDeleteConfirmActive: boolean = false;
    public olDeleteConfirmMsg: string = "";
    public olDeleteId: number = null;
    public olCancelId: number = null;
    public olCancelConfirmActive: boolean = false; 
    public olCancelConfirmMsg: string = "";
    public olCompleteId: number = null;
    public olCompleteConfirmActive: boolean = false; 
    public olCompleteConfirmMsg: string = "";
    public olActivateId: number = null;
    public olActivateConfirmActive: boolean = false; 
    public olActivateConfirmMsg: string = "";
    public statusActive: OrderStatus = OrderStatus.Active;
    public statusCompleted: OrderStatus = OrderStatus.Completed;
    public statusCancelled: OrderStatus = OrderStatus.Cancelled;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,   
        private orderRepository: OrderRepository,               
        private hallRepository: HallRepository,
        private employeeRepository: EmployeeRepository,
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get ol(): Order[] {return this.orderRepository.xlChunk;}
    get olSum(): number {return this.orderRepository.sum;}
    get olCurrentPart(): number {return this.orderRepository.chunkCurrentPart;}
    set olCurrentPart(v: number) {this.orderRepository.chunkCurrentPart = v;}
    get olAllLength(): number {return this.orderRepository.allLength;}  
    get olLength(): number {return this.orderRepository.chunkLength;}   
    get olSortBy(): string {return this.orderRepository.chunkSortBy;}
    get olSortDir(): number {return this.orderRepository.chunkSortDir;}
    set olSortBy(v: string) {this.orderRepository.chunkSortBy = v;}
    set olSortDir(v: number) {this.orderRepository.chunkSortDir = v;}
    get olFilterCreatedAt(): Date[] {return this.orderRepository.filterCreatedAt;}
    set olFilterCreatedAt(v: Date[]) {this.orderRepository.filterCreatedAt = v;}
    get olFilterHallId(): number {return this.orderRepository.filterHallId;}
    set olFilterHallId(v: number) {this.orderRepository.filterHallId = v;}
    get olFilterTableId(): number {return this.orderRepository.filterTableId;}
    set olFilterTableId(v: number) {this.orderRepository.filterTableId = v;}
    get olFilterEmployeeId(): number {return this.orderRepository.filterEmployeeId;}
    set olFilterEmployeeId(v: number) {this.orderRepository.filterEmployeeId = v;}
    get olFilterStatus(): OrderStatus {return this.orderRepository.filterStatus;}
    set olFilterStatus(v: OrderStatus) {this.orderRepository.filterStatus = v;}
    get hl(): Hall[] {return this.hallRepository.xlAll;}
    get tl(): Table[] {return this.hl.find(h => h.id === this.olFilterHallId)?.tables || [];}
    get el(): Employee[] {return this.employeeRepository.xlAll;}

    public async ngOnInit(): Promise<void> {        
        this.initTitle();  
        this.initAuthCheck();   
        this.initHalls();
        this.initEmployees();
        await this.initOrders();           
        await this.appService.pause(500);
        this.ready = true;
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-all-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-all-index"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initOrders(): Promise<void> {
        try {
            this.olLoading = true;
            this.orderRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            await this.orderRepository.loadChunk();  
            setTimeout(() => this.olLoading = false, 500);                               
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public initHalls(): void {
        try {
            this.hallRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            this.hallRepository.loadAll();     
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public initEmployees(): void {
        try {
            this.employeeRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            this.employeeRepository.loadAll();     
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.olSortBy === sortBy) {
            this.olSortDir *= -1;
        } else {
            this.olSortBy = sortBy;
            this.olSortDir = 1;
        }

        this.initOrders();
    }

    public setSorting(i: string): void {
        let sorting = this.olSortingVariants[parseInt(i)];
        this.olSortBy = sorting[0];
        this.olSortDir = sorting[1];
        this.initOrders();
    }

    public getStatusName(status: OrderStatus): string {
        return this.words["restorator-orders"][`status-${status}`][this.currentLang.slug];
    }
    
    public olOnDelete(o: Order): void {
        this.olDeleteId = o.id;
        this.olDeleteConfirmMsg = `${this.words['restorator-orders']['confirm-delete'][this.currentLang.slug]} ${o.id}?`;
        this.olDeleteConfirmActive = true;
    }

    public async olDelete(): Promise<void> {
        try {
            this.olDeleteConfirmActive = false;
            this.olLoading = true;            
            await this.orderRepository.delete(this.olDeleteId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }
    }
    
    public olOnCancel(o: Order): void {
        this.olCancelId = o.id;
        this.olCancelConfirmMsg = `${this.words['restorator-orders']['confirm-cancel2'][this.currentLang.slug]} ${o.id}?`;
        this.olCancelConfirmActive = true;
    }

    public async olCancel(): Promise<void> { 
        try {
            this.olCancelConfirmActive = false;   
            this.olLoading = true;         
            await this.orderRepository.cancel(this.olCancelId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }        
    }

    public olOnComplete(o: Order): void {
        this.olCompleteId = o.id;
        this.olCompleteConfirmMsg = `${this.words['restorator-orders']['confirm-complete2'][this.currentLang.slug]} ${o.id}?`;
        this.olCompleteConfirmActive = true;
    }

    public async olComplete(): Promise<void> { 
        try {
            this.olCompleteConfirmActive = false;   
            this.olLoading = true;         
            await this.orderRepository.complete(this.olCompleteId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }        
    }

    public olOnActivate(o: Order): void {
        this.olActivateId = o.id;
        this.olActivateConfirmMsg = `${this.words['restorator-orders']['confirm-activate'][this.currentLang.slug]} ${o.id}?`;
        this.olActivateConfirmActive = true;
    }

    public async olActivate(): Promise<void> { 
        try {
            this.olActivateConfirmActive = false;   
            this.olLoading = true;         
            await this.orderRepository.activate(this.olActivateId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }        
    }

    public olExport(): void {
        this.orderRepository.export(this.currentLang.id);
    }
}