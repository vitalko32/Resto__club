import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Currency } from "src/app/model/orm/currency.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-restaurant",
    templateUrl: "restaurant.component.html",
    styleUrls: ["../../../../common.styles/forms.scss"]
})
export class RestaurantComponent {
    @Input() x: Restaurant;
    @Input() cl: Currency[];
    @Input() ll: Lang[];
    @Input() mode: string = "create";
    @Input() loading: boolean = false;
    @Input() errorDomainDuplication: boolean = false;
    @Input() errorEmailDuplication: boolean = false;
    @Output() save: EventEmitter<void> = new EventEmitter();
    public errorName: boolean = false;
    public errorDomain: boolean = false;
    public errorEmail: boolean = false;
    public errorPassword: boolean = false;

    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,        
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    

    public onSave(): void {
        if (this.validate()) {
            this.save.emit();
        }        
    }

    private validate(): boolean {
        let error = false;

        if (!this.x.name.length) {
            this.errorName = true;
            error = true;
        } else {
            this.errorName = false;
        }        

        if (this.mode === "create") {
            if (!this.x.domain.length) {
                this.errorDomain = true;
                error = true;
            } else {
                this.errorDomain = false;
            }

            if (!this.x.employees[0].email.length || !this.appService.validateEmail(this.x.employees[0].email)) {
                this.errorEmail = true;
                error = true;
            } else {
                this.errorEmail = false;
            }

            if (!this.x.employees[0].password.length) {
                this.errorPassword = true;
                error = true;
            } else {
                this.errorPassword = false;
            }
        }        

        return !error;
    }
}