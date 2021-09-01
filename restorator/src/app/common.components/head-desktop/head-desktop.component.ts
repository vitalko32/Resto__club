import { Component, Input } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "head-desktop",
    templateUrl: "head-desktop.component.html",
    styleUrls: ["head-desktop.component.scss"],
})
export class HeadDesktopComponent {        
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
    get title(): string {return this.appService.title;}    
    get showLogout(): boolean {return !(this.appService.url[1] === "auth" && this.appService.url[2] !== "password");}    

    public activateLangPanel(): void {
        this.langPanelActive = true;
        this.langPanelTimer ? window.clearTimeout(this.langPanelTimer) : null;        
        this.langPanelTimer = window.setTimeout(() => this.langPanelActive = false, 5000);
    }

    public setLang(l: Lang): void {
        this.appService.setLang(l);
        this.langPanelActive = false;
    }    
}