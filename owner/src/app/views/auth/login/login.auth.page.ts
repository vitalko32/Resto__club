import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "login-auth-page",
    templateUrl: "login.auth.page.html",
    styleUrls: [],
})
export class LoginAuthPage {
    public langSubscription: Subscription = null;
    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.initTitle();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["owner-login"]["title"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["owner-login"]["title"][lang.slug]));
    }
}