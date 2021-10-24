import { Component, Directive, Injectable, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IChunk } from "src/app/model/chunk.interface";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { RestaurantRepository } from "src/app/services/repositories/restaurant.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { RestaurantsListService } from "./restaurants.list.service";

@Directive()
export abstract class RestaurantsListPage implements OnInit, OnDestroy {    
    public rlChunk: IChunk<Restaurant> = null;        
    public rlLoading: boolean = false;                
    public rlSortingVariants: any[][] = // для мобильной верстки
        [["created_at", 1], ["created_at", -1], ["name", 1], ["name", -1], ["money", 1], ["money", -1], ["daysleft", 1], ["daysleft", -1]];        
    public abstract type: string;
    public langSubscription: Subscription = null;        
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;
    public rechargeRestaurant: Restaurant = null;
    public rechargePanelActive: boolean = false;
    
    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,
        protected restaurantRepository: RestaurantRepository,
        protected listService: RestaurantsListService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}       
    get rl(): Restaurant[] {return this.rlChunk.data;}
    get rlAllLength(): number {return this.rlChunk.allLength;}    
    get rlLength(): number {return this.restaurantRepository.chunkLength;}       
    get rlCurrentPart(): number {return this.listService.currentPart;}
    set rlCurrentPart(v: number) {this.listService.currentPart = v;}
    get rlSortBy(): string {return this.listService.sortBy;}
    set rlSortBy(v: string) {this.listService.sortBy = v;}
    get rlSortDir(): number {return this.listService.sortDir;}    
    set rlSortDir(v: number) {this.listService.sortDir = v;}
    get rlFilterName(): string {return this.listService.filterName;}
    set rlFilterName(v: string) {this.listService.filterName = v;}
    get rlFilterDaysleft(): string {return this.listService.filterDaysleft;}
    set rlFilterDaysleft(v: string) {this.listService.filterDaysleft = v;}
    get rlFilterActive(): boolean {return this.listService.filterActive;}
    get rlFilter() {return {active: this.rlFilterActive, name: this.rlFilterName, daysleft: this.rlFilterDaysleft};}

    public ngOnInit(): void {        
        this.initTitle();
        this.initRestaurants();        
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["owner-restaurants"][`title-${this.type}`][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["owner-restaurants"][`title-${this.type}`][lang.slug]));        
    }       
    
    public async initRestaurants(): Promise<void> {		                
        try {
            this.rlLoading = true;            
            this.rlChunk = await this.restaurantRepository.loadChunk(this.rlCurrentPart, this.rlSortBy, this.rlSortDir, this.rlFilter);            
                    
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
    
    public changeSorting(sortBy: string): void {
        if (this.rlSortBy === sortBy) {
            this.rlSortDir *= -1;
        } else {
            this.rlSortBy = sortBy;
            this.rlSortDir = 1;
        }

        this.initRestaurants();
    }

    public setSorting(i: string): void {
        let sorting = this.rlSortingVariants[parseInt(i)];
        this.rlSortBy = sorting[0];
        this.rlSortDir = sorting[1];
        this.initRestaurants();
    }

    public onDelete(r: Restaurant): void {
        this.deleteId = r.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${r.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.rlLoading = true;
            await this.restaurantRepository.delete(this.deleteId);
            this.initRestaurants();
        } catch (err) {
            this.appService.showError(err);
            this.rlLoading = false;
        }
    }    

    public onRecharge(r: Restaurant): void {
        this.rechargeRestaurant = r;
        this.rechargePanelActive = true;
    }
}