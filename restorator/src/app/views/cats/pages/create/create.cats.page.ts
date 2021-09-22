import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Cat } from "src/app/model/orm/cat.model";
import { Icon } from "src/app/model/orm/icon.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { IconRepository } from "src/app/services/repositories/icon.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-cats-page",
    templateUrl: "create.cats.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CreateCatsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public cat: Cat = null;
    public formLoading: boolean = false; 
    public formErrorName: boolean = false;           

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,    
        private catRepository: CatRepository,   
        private iconRepository: IconRepository,
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get il(): Icon[] {return this.iconRepository.xlAll;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();      
        this.initCat();      
        this.initIcons();  
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-cats"]["title-create"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-cats"]["title-create"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private initCat(): void {
        this.cat = new Cat().init(this.authService.authData.value.employee.restaurant_id);
    }  
    
    private initIcons(): void {
        try {
            this.iconRepository.loadAll();
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public async create(): Promise<void> {
        try {            
            if (this.validate()) {
                this.formLoading = true;                
                await this.catRepository.create(this.cat);
                this.formLoading = false;                
                this.router.navigateByUrl("/kitchen/cats");                
            }            
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }

    private validate(): boolean {
        let error = false;
        this.cat.name = this.appService.trim(this.cat.name);        

        if (!this.cat.name.length) {
            this.formErrorName = true;
            error = true;
        } else {
            this.formErrorName = false;
        }

        return !error;
    }
}