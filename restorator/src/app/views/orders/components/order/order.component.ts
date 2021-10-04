import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Employee } from "src/app/model/orm/employee.model";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order } from "src/app/model/orm/order.model";
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
export class OrderComponent {
    @Input() x: Order;    
    @Input() hl: Hall[] = [];
    @Input() sl: IServing[] = [];
    @Input() loading: boolean = false;        
    @Output() save: EventEmitter<void> = new EventEmitter();  
    public productToDelete: IOrderProduct = null;
    public productDeleteConfirmActive: boolean = false;
    public productDeleteConfirmMsg: string = "";

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

    public onSave(): void {
        this.save.emit();
    }  
    
    public onProductDelete(p: IOrderProduct): void {
        this.productToDelete = p;
        this.productDeleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${p.name}"?`;
        this.productDeleteConfirmActive = true;
    }
    
    public productDelete(): void {
        this.productDeleteConfirmActive = false;
        this.x.products.splice(this.x.products.indexOf(this.productToDelete), 1);
    }
}