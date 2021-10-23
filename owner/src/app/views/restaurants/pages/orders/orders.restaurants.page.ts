import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { RestaurantRepository } from "src/app/services/repositories/restaurant.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "orders-restaurants-page",
    templateUrl: "orders.restaurants.page.html",   
    styleUrls: ["../../../../common.styles/data.scss"],    
})
export class OrdersRestaurantsPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;      
    public restaurant: Restaurant = null;
    public olLoading: boolean = false;       
    public statusCompleted: OrderStatus = OrderStatus.Completed;
    public statusCancelled: OrderStatus = OrderStatus.Cancelled; 
    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private orderRepository: OrderRepository,
        private restaurantRepository: RestaurantRepository,
        private route: ActivatedRoute,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get type(): string {return this.route.snapshot.params["type"];}
    get ol(): Order[] {return this.orderRepository.xlChunk;}
    set ol(v: Order[]) {this.orderRepository.xlChunk = v;}
    get olCurrentPart(): number {return this.orderRepository.chunkCurrentPart;}
    set olCurrentPart(v: number) {this.orderRepository.chunkCurrentPart = v;}
    get olAllLength(): number {return this.orderRepository.allLength;}  
    get olLength(): number {return this.orderRepository.chunkLength;}   
    get olFilterCreatedAt(): Date[] {return this.orderRepository.filterCreatedAt;}  
    set olFilterCreatedAt(v: Date[]) {this.orderRepository.filterCreatedAt = v;}
    get olSortBy(): string {return this.orderRepository.chunkSortBy;}
    get olSortDir(): number {return this.orderRepository.chunkSortDir;}
    set olSortBy(v: string) {this.orderRepository.chunkSortBy = v;}
    set olSortDir(v: number) {this.orderRepository.chunkSortDir = v;}
    get olSum(): number {return this.orderRepository.sum;}
        
    public ngOnInit(): void {
        this.initTitle();    
        this.initRestaurant();  
        this.olCurrentPart = 0;
        this.ol = [];
        this.initOrders();      
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }    
    
    private initTitle(): void {
        this.appService.setTitle(this.words["owner-orders"][`title`][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["owner-orders"][`title`][lang.slug]));        
    }  
    
    private async initRestaurant(): Promise<void> {
        try {
            let id: number = parseInt(this.route.snapshot.params["id"]);
            this.restaurant = await this.restaurantRepository.loadOne(id);
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public async initOrders(): Promise<void> {		                
        try {
            this.olLoading = true;
            this.orderRepository.filterRestaurantId = parseInt(this.route.snapshot.params["id"]);
            await this.orderRepository.loadChunk();            
            
            if (this.olCurrentPart > 0 && this.olCurrentPart > Math.ceil(this.olAllLength / this.olLength) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again            
                this.olCurrentPart = 0;
                this.initOrders();
            } else {
                await this.appService.pause(500);
                this.olLoading = false;
            } 
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }        
    }  

    public getStatusName(status: OrderStatus): string {
        return this.words["owner-orders"][`status-${status}`][this.currentLang.slug];
    }
}