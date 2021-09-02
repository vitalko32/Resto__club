import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Transaction, TransactionType } from "src/app/model/orm/transaction.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { RestaurantRepository } from "src/app/services/repositories/restaurant.repository";
import { TransactionRepository } from "src/app/services/repositories/transaction.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "transactions-restaurants-page",
    templateUrl: "transactions.restaurants.page.html",   
    styleUrls: ["../../../../common.styles/data.scss"],    
})
export class TransactionsRestaurantsPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;          
    public restaurant: Restaurant = null;
    public tlLoading: boolean = false;
    public tlSortingVariants: any[][] = // для мобильной верстки
        [["created_at", 1], ["created_at", -1], ["type", 1], ["type", -1], ["amount", 1], ["amount", -1]];    
    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private restaurantRepository: RestaurantRepository,
        private transactionRepository: TransactionRepository,
        private route: ActivatedRoute,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get type(): string {return this.route.snapshot.params["type"];}
    get tl(): Transaction[] {return this.transactionRepository.xl;}
    get tlCurrentPart(): number {return this.transactionRepository.chunkCurrentPart;}
    set tlCurrentPart(v: number) {this.transactionRepository.chunkCurrentPart = v;}
    get tlAllLength(): number {return this.transactionRepository.allLength;}  
    get tlLength(): number {return this.transactionRepository.chunkLength;}   
    get tlFilterCreatedAt(): Date[] {return this.transactionRepository.filterCreatedAt;}  
    set tlFilterCreatedAt(v: Date[]) {this.transactionRepository.filterCreatedAt = v;}
    get tlSortBy(): string {return this.transactionRepository.sortBy;}
    get tlSortDir(): number {return this.transactionRepository.sortDir;}
    set tlSortBy(v: string) {this.transactionRepository.sortBy = v;}
    set tlSortDir(v: number) {this.transactionRepository.sortDir = v;}
    get tlSum(): number {return this.transactionRepository.sum;}
        
    public ngOnInit(): void {
        this.initTitle();            
        this.initRestaurant();
        this.initTransactions();
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

    public async initTransactions(): Promise<void> {		                
        try {
            this.tlLoading = true;
            this.transactionRepository.filterRestaurantId = parseInt(this.route.snapshot.params["id"]);
            await this.transactionRepository.loadChunk();            
            await this.appService.pause(500);
            this.tlLoading = false;            
        } catch (err) {
            this.appService.showError(err);
            this.tlLoading = false;
        }        
    }    
    
    private initTitle(): void {
        this.appService.setTitle(this.words["owner-transactions"][`title`][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["owner-transactions"][`title`][lang.slug]));        
    }

    public changeSorting(sortBy: string): void {
        if (this.tlSortBy === sortBy) {
            this.tlSortDir *= -1;
        } else {
            this.tlSortBy = sortBy;
            this.tlSortDir = 1;
        }

        this.initTransactions();
    }

    public setSorting(i: string): void {
        let sorting = this.tlSortingVariants[parseInt(i)];
        this.tlSortBy = sorting[0];
        this.tlSortDir = sorting[1];
        this.initTransactions();
    }

    public transactionType(t: Transaction): string {       
        if (t.type == TransactionType.Auto) {
            return this.words['owner-transactions']['type-auto'][this.currentLang.slug];
        }

        if (t.type == TransactionType.Employee) {
            return this.words['owner-transactions']['type-employee'][this.currentLang.slug];
        }

        if (t.type == TransactionType.Admin) {
            return this.words['owner-transactions']['type-admin'][this.currentLang.slug];
        }
        
        return "unknown";
    }
}