import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Currency } from "src/app/model/orm/currency.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { CurrencyRepository } from "src/app/services/repositories/currency.repository";
import { RestaurantRepository } from "src/app/services/repositories/restaurant.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-restaurants-page",
    templateUrl: "create.restaurants.page.html",
    styleUrls: ["../../../../common.styles/forms.scss"],
})
export class CreateRestaurantsPage implements OnInit, OnDestroy {
    public type: string = "";
    public langSubscription: Subscription = null;          
    public restaurant: Restaurant = new Restaurant().init(); 
    public formLoading: boolean = false; 
    public formErrorDomainDuplication: boolean = false;
    public formErrorEmailDuplication: boolean = false;
    
    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,
        protected restaurantRepository: RestaurantRepository,
        protected currencyRepository: CurrencyRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get cl(): Currency[] {return this.currencyRepository.xl;}
    
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
        console.log("create");
    }
}