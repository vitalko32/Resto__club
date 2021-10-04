import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { IOrderProduct } from "src/app/model/orm/order.product.interface";
import { IServing } from "src/app/model/orm/serving.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "order-product-editable",
    templateUrl: "order-product-editable.component.html",
    styleUrls: ["order-product-editable.component.scss"],
})
export class OrderProductEditableComponent {
    @Input() product: IOrderProduct = null;
    @Input() sl: IServing[] = [];    
    @Output() delete: EventEmitter<void> = new EventEmitter();

    constructor(
        private wordRepository: WordRepository,        
        private appService: AppService,
        private authService: AuthService,         
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;} 
    get currency_symbol(): string {return this.employee.restaurant.currency.symbol;}          

    public onDelete(): void {
        this.delete.emit();
    }
}