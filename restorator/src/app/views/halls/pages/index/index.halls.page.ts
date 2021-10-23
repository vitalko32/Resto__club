import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "index-halls-page",
    templateUrl: "index.halls.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class IndexHallsPage implements OnInit, OnDestroy {
    public ready: boolean = false;
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public hlLoading: boolean = false;
    public hlSortingVariants: any[][] = // для мобильной верстки
        [["name", 1], ["name", -1], ["pos", 1], ["pos", -1]];   
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,   
        private hallRepository: HallRepository,         
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get hl(): Hall[] {return this.hallRepository.xlChunk;}
    get hlCurrentPart(): number {return this.hallRepository.chunkCurrentPart;}
    set hlCurrentPart(v: number) {this.hallRepository.chunkCurrentPart = v;}
    get hlAllLength(): number {return this.hallRepository.allLength;}  
    get hlLength(): number {return this.hallRepository.chunkLength;}   
    get hlSortBy(): string {return this.hallRepository.chunkSortBy;}
    get hlSortDir(): number {return this.hallRepository.chunkSortDir;}
    set hlSortBy(v: string) {this.hallRepository.chunkSortBy = v;}
    set hlSortDir(v: number) {this.hallRepository.chunkSortDir = v;}

    public async ngOnInit(): Promise<void> {        
        this.initTitle();  
        this.initAuthCheck();   
        await this.initHalls();   
        await this.appService.pause(500);
        this.ready = true;
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

    public async initHalls(): Promise<void> {
        try {
            this.hlLoading = true;
            this.hallRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            await this.hallRepository.loadChunk();                     
            setTimeout(() => this.hlLoading = false, 500);            
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.hlSortBy === sortBy) {
            this.hlSortDir *= -1;
        } else {
            this.hlSortBy = sortBy;
            this.hlSortDir = 1;
        }

        this.initHalls();
    }

    public setSorting(i: string): void {
        let sorting = this.hlSortingVariants[parseInt(i)];
        this.hlSortBy = sorting[0];
        this.hlSortDir = sorting[1];
        this.initHalls();
    }

    public onDelete(h: Hall): void {
        this.deleteId = h.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${h.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.hlLoading = true;            
            await this.hallRepository.delete(this.deleteId);
            this.initHalls();
        } catch (err) {
            this.appService.showError(err);
            this.hlLoading = false;
        }
    }  
}