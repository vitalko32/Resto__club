import { Component } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "dash-desktop",
    templateUrl: "dash-desktop.component.html",
    styleUrls: ["dash-desktop.component.scss"],
})
export class DashDesktopComponent {
    public langPanelActive: boolean = false;
    public langPanelTimer: number = null;
    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private langRepository: LangRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get langs(): Lang[] {return this.langRepository.xl;}

    public activateLangPanel(): void {
        this.langPanelActive = true;
        this.langPanelTimer ? window.clearTimeout(this.langPanelTimer) : null;        
        this.langPanelTimer = window.setTimeout(() => this.langPanelActive = false, 5000);
    }

    public setLang(l: Lang): void {
        this.appService.currentLang.next(l);
        this.langPanelActive = false;
    }
}