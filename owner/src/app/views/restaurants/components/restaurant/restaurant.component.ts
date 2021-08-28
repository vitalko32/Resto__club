import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { Currency } from "src/app/model/orm/currency.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-restaurant",
    templateUrl: "restaurant.component.html",    
})
export class RestaurantComponent {
    @Input() x: Restaurant;
    @Input() cl: Currency[];
    @Input() ll: Lang[];
    @Input() mode: string = "create";
    @Input() loading: boolean = false;
    @Input() errorDomainDuplication: boolean = false;
    @Input() errorEmailDuplication: boolean = false;
    @Input() errorName: boolean = false;
    @Input() errorDomain: boolean = false;
    @Input() errorEmail: boolean = false;
    @Input() errorPassword: boolean = false;
    @Output() save: EventEmitter<void> = new EventEmitter();    

    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,        
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    

    public onSave(): void {
        this.save.emit();
    }    
}