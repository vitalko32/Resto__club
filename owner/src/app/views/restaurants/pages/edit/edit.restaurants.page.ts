import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
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
    selector: "edit-restaurants-page",
    templateUrl: "edit.restaurants.page.html",   
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None, 
})
export class EditRestaurantsPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;          
    public restaurant: Restaurant = null;
    public formLoading: boolean = false;     
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);   

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
    get cl(): Currency[] {return this.currencyRepository.xlAll;}
    get ll(): Lang[] {return this.langRepository.xlAll;}
    get type(): string {return this.route.snapshot.params["type"];}
    
    public ngOnInit(): void {
        this.initTitle();    
        this.initCurrencies();
        this.initRestaurant();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private async initRestaurant(): Promise<void> {
        try {
            let id: number = parseInt(this.route.snapshot.params["id"]);
            this.restaurant = await this.restaurantRepository.loadOne(id);
        } catch (err) {
            this.appService.showError(err);
        }
    }
    
    private initTitle(): void {
        this.appService.setTitle(this.words["owner-restaurants"][`title-edit`][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["owner-restaurants"][`title-edit`][lang.slug]));        
    }  

    private async initCurrencies(): Promise<void> {
        try {
            this.currencyRepository.loadAll();
        } catch (err) {
            this.appService.showError(err);
        }
    }
    
    public async update(): Promise<void> {
        try {            
            this.formLoading = true;
            await this.restaurantRepository.update(this.restaurant);
            this.formLoading = false;
            this.router.navigateByUrl(`/restaurants/${this.type}`);                                        
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;
        }
    }    
}