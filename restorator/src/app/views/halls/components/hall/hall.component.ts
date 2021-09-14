import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { SettingRepository } from "src/app/services/repositories/setting.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-hall",
    templateUrl: "hall.component.html",    
})
export class HallComponent {
    @Input() x: Hall;    
    @Input() loading: boolean = false;    
    @Input() errorName: boolean = false;    
    @Output() save: EventEmitter<void> = new EventEmitter();    

    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,    
        protected settingRepository: SettingRepository,    
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}        

    public onSave(): void {
        this.save.emit();
    }    
}