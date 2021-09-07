import { Component } from "@angular/core";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-menu",
    templateUrl: "menu.component.html",
    styleUrls: ["menu.component.scss"],
})
export class MenuComponent {
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private authService: AuthService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get url(): string[] {return this.appService.url;}    
    get employee(): Employee {return this.authService.authData.value.employee;}
}