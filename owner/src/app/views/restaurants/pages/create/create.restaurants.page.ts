import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Currency } from "src/app/model/orm/currency.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { CurrencyRepository } from "src/app/services/repositories/currency.repository";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { RestaurantRepository } from "src/app/services/repositories/restaurant.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-restaurants-page",
    templateUrl: "create.restaurants.page.html",    
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CreateRestaurantsPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;          
    public restaurant: Restaurant = new Restaurant().init(); 
    public formLoading: boolean = false; 
    public formErrorDomainDuplication: boolean = false;
    public formErrorEmailDuplication: boolean = false;
    public formErrorName: boolean = false;
    public formErrorDomain: boolean = false;
    public formErrorEmail: boolean = false;
    public formErrorPassword: boolean = false;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private restaurantRepository: RestaurantRepository,
        private currencyRepository: CurrencyRepository,
        private langRepository: LangRepository,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get cl(): Currency[] {return this.currencyRepository.xl;}
    get ll(): Lang[] {return this.langRepository.xl;}
    get type(): string {return this.route.snapshot.params["type"];}
    
    public ngOnInit(): void {
        this.initTitle();    
        this.initCurrencies();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["owner-restaurants"][`title-create`][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["owner-restaurants"][`title-create`][lang.slug]));        
    }  

    private async initCurrencies(): Promise<void> {
        try {
            this.currencyRepository.loadAll();
        } catch (err) {
            this.appService.showError(err);
        }
    }
    
    public async create(): Promise<void> {
        try {
            if (this.validate()) {
                this.formLoading = true;
                this.formErrorDomainDuplication = false;
                this.formErrorEmailDuplication = false;
                let statusCode = await this.restaurantRepository.create(this.restaurant);
                this.formLoading = false;
    
                if (statusCode === 200) {
                    this.router.navigateByUrl("/restaurants/inactive"); // после создания переходим в неактивные, т.к. созданный ресторан неактивен
                } else if (statusCode === 409) {
                    this.formErrorDomainDuplication = true;
                } else if (statusCode === 410) {
                    this.formErrorEmailDuplication = true;
                } else {
                    this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
                }
            }            
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;
        }
    }

    private validate(): boolean {
        let error = false;

        if (!this.restaurant.name.length) {
            this.formErrorName = true;
            error = true;
        } else {
            this.formErrorName = false;
        }        

        if (!this.restaurant.domain.length) {
            this.formErrorDomain = true;
            error = true;
        } else {
            this.formErrorDomain = false;
        }

        if (!this.restaurant.employees[0].email.length || !this.appService.validateEmail(this.restaurant.employees[0].email)) {
            this.formErrorEmail = true;
            error = true;
        } else {
            this.formErrorEmail = false;
        }

        if (!this.restaurant.employees[0].password.length) {
            this.formErrorPassword = true;
            error = true;
        } else {
            this.formErrorPassword = false;
        }

        return !error;
    }
}