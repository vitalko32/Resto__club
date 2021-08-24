import { Component, Input } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "dash-mobile",
    templateUrl: "dash-mobile.component.html",
    styleUrls: ["dash-mobile.component.scss"],
})
export class DashMobileComponent {
    @Input() title: string = "";
    public menuActive: boolean = false;
    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private langRepository: LangRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get langs(): Lang[] {return this.langRepository.xl;}

    public setLang(l: Lang): void {
        this.appService.currentLang.next(l);
        this.menuActive = false;
    }
}