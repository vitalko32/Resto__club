import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "index-halls-page",
    templateUrl: "index.halls.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class IndexHallsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,            
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();      
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-halls"]["title-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-halls"]["title-index"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }
}