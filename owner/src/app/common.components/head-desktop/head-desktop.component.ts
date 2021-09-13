import { Component, Input } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "head-desktop",
    templateUrl: "head-desktop.component.html",
    styleUrls: ["head-desktop.component.scss"],
})
export class HeadDesktopComponent {    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private langRepository: LangRepository,
        private authService: AuthService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get langs(): Lang[] {return this.langRepository.xl;}
    get title(): string {return this.appService.title;}    
    get showLogout(): boolean {return this.authService.authData !== null;}   
    set langPanelActive(v: boolean) {this.appService.langPanelActive = v;}     
}