import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { SettingRepository } from "src/app/services/repositories/setting.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-employee",
    templateUrl: "employee.component.html",    
})
export class EmployeeComponent {
    @Input() x: Employee;
    @Input() mode: string = "create";
    @Input() loading: boolean = false;    
    @Input() errorEmail: boolean = false;
    @Input() errorEmailDuplication: boolean = false;    
    @Input() errorPassword: boolean = false;        
    @Input() errorName: boolean = false;    
    @Output() save: EventEmitter<void> = new EventEmitter();    

    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,    
        protected settingRepository: SettingRepository,    
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get price(): number {return parseFloat(this.settingRepository.settings["price"]);}

    public onSave(): void {
        this.save.emit();
    }    
}