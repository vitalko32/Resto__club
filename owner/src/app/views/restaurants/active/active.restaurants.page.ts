import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { RestaurantActiveRepository } from "src/app/services/repositories/restaurant.active.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "active-restaurants-page",
    templateUrl: "active.restaurants.page.html",   
    styleUrls: ["../../../common.styles/data.scss"],
})
export class ActiveRestaurantsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;    
    public rlLoading: boolean = false;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private restaurantRepository: RestaurantActiveRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get rl(): Restaurant[] {return this.restaurantRepository.xl;}
    get rlCurrentPart(): number {return this.restaurantRepository.chunkCurrentPart;}
    set rlCurrentPart(v: number) {this.restaurantRepository.chunkCurrentPart = v;}
    get rlAllLength(): number {return this.restaurantRepository.allLength;}  
    get rlLength(): number {return this.restaurantRepository.chunkLength;}   
    get rlFilterName(): string {return this.restaurantRepository.filterName;}  
    set rlFilterName(v: string) {this.restaurantRepository.filterName = v;}
    get rlFilterActiveUntil(): Date {return this.restaurantRepository.filterActiveUntil;}  
    set rlFilterActiveUntil(v: Date) {this.restaurantRepository.filterActiveUntil = v;}

    public ngOnInit(): void {
        this.initTitle();
        this.initRestaurants();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["owner-restaurants"]["title-active"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["owner-restaurants"]["title-active"][lang.slug]));
    }       
    
    public async initRestaurants(): Promise<void> {		                
        try {
            this.rlLoading = true;
            await this.restaurantRepository.loadChunk();            
                    
            if (this.rlCurrentPart > 0 && this.rlCurrentPart > Math.ceil(this.rlAllLength / this.rlLength) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again            
                this.rlCurrentPart = 0;
                this.initRestaurants();
            } else {
                await this.appService.pause(500);
                this.rlLoading = false;
            }      
        } catch (err) {
            this.appService.showError(err);
            this.rlLoading = false;
        }        
    } 
}