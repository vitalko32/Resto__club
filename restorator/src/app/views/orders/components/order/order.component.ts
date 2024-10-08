import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, OrderStatus, Paymethod } from "src/app/model/orm/order.model";
import { IOrderProduct } from "src/app/model/orm/order.product.interface";
import { IServing } from "src/app/model/orm/serving.interface";
import { Table } from "src/app/model/orm/table.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-order",
    templateUrl: "order.component.html",    
})
export class OrderComponent implements OnInit, OnDestroy {
    @Input() x: Order;    
    @Input() hl: Hall[] = [];
    @Input() sl: IServing[] = [];
    @Input() el: Employee[] = [];
    @Input() adminMode: boolean = true; // режим для администратора
    @Input() loading: boolean = false;     
    @Input() cmdSave: BehaviorSubject<boolean> = null;
    @Output() save: EventEmitter<void> = new EventEmitter();  
    @Output() complete: EventEmitter<void> = new EventEmitter();  
    
    private cmdSaveSubscription: Subscription = null;
    public payCash: Paymethod = Paymethod.Cash;
    public payCard: Paymethod = Paymethod.Card;
    public productToDelete: IOrderProduct = null;
    public productDeleteConfirmActive: boolean = false;
    public productDeleteConfirmMsg: string = "";
    public productFinderActive: boolean = false;
    public orderCompleteConfirmActive: boolean = false;
    public orderErrorHall: boolean = false;
    public orderErrorTable: boolean = false; 
    public orderSaveConfirmActive: boolean = false;   
    public statusActive: OrderStatus = OrderStatus.Active;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,  
        private authService: AuthService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get tl(): Table[] {return this.hl.find(h => h.id === this.x.hall_id)?.tables || [];}    
    get employee(): Employee {return this.authService.authData.value.employee;}
    get currency_symbol(): string {return this.employee.restaurant.currency.symbol;}     

    public ngOnInit(): void {
        this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.orderOnSave() : null);
    }

    public ngOnDestroy(): void {
        this.cmdSaveSubscription?.unsubscribe();
    }
    
    public productOnDelete(p: IOrderProduct): void {
        this.productToDelete = p;
        this.productDeleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${p.name}"?`;
        this.productDeleteConfirmActive = true;
    }
    
    public productDelete(): void {
        this.productDeleteConfirmActive = false;
        this.x.products.splice(this.x.products.indexOf(this.productToDelete), 1);
    }

    public orderOnComplete(): void {
        this.orderCompleteConfirmActive = true;
    }    

    public orderComplete(): void {
        this.orderCompleteConfirmActive = false;
        this.complete.emit();
    }    

    private orderValidate(): boolean {
        let error: boolean = false;

        if (!this.x.hall_id) {
            this.orderErrorHall = true;
            error = true;
        } else {
            this.orderErrorHall = false;
        }

        if (!this.x.table_id) {
            this.orderErrorTable = true;
            error = true;
        } else {
            this.orderErrorTable = false;
        }        
        
        return !error;
    }

    public orderOnSave(): void {
        if (this.orderValidate()) {
            this.orderSaveConfirmActive = true;
        }
    }

    public orderSave(): void {
        this.orderSaveConfirmActive = false;
        this.save.emit();
    }
}