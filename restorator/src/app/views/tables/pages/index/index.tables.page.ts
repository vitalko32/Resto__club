import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ICoord } from "src/app/model/coord.interface";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "index-tables-page",
    templateUrl: "index.tables.page.html",
    styleUrls: ["index.tables.page.scss", "../../../../common.styles/data.scss"],
})
export class IndexTablesPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public currentHall: Hall = null;
    public places: ICoord[] = [];

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,
        private hallRepository: HallRepository,            
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get hl(): Hall[] {return this.hallRepository.xlAll;}
    get currentHallId(): number {return this.hallRepository.currentId;}
    set currentHallId(v: number) {this.hallRepository.currentId = v;}
    
    public async ngOnInit(): Promise<void> {        
        this.initTitle();  
        this.initAuthCheck();  
        await this.initHalls();    
        this.initCurrentHall();    
        this.initPlaces();        
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-tables"]["title"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-tables"]["title"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private async initHalls(): Promise<void> {
        try {
            this.hallRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            await this.hallRepository.loadAll();             
        } catch (err) {
            this.appService.showError(err);
        }
    }

    private initCurrentHall(): void {
        if (!this.currentHallId) {
            this.currentHallId = this.hl[0].id;
            this.currentHall = this.hl[0];
        } else {
            let temp = this.hl.find(h => h.id === this.currentHallId);

            if (temp) {
                this.currentHall = temp;
            } else {
                this.currentHallId = this.hl[0].id;
                this.currentHall = this.hl[0];
            }
        }
    }

    private initPlaces(): void {
        this.places = [];

        for (let i = 0; i < this.currentHall.ny; i++) {            
            for (let j = 0; j < this.currentHall.nx; j++) {
                this.places.push({x: i, y: j});
            }
        }
    }

    public setCurrentHall(hall: Hall): void {
        this.currentHallId = hall.id;
        this.currentHall = hall;
        this.initPlaces();
    }
}