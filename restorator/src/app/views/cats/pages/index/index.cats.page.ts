import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Cat } from "src/app/model/orm/cat.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "index-cats-page",
    templateUrl: "index.cats.page.html",
    styleUrls: ["../../../../common.styles/data.scss"]
})
export class IndexCatsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public clLoading: boolean = false;    
    public clSortingVariants: any[][] = // для мобильной верстки
        [["name", 1], ["name", -1], ["pos", 1], ["pos", -1]];   
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,            
        private catRepository: CatRepository,
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get cl(): Cat[] {return this.catRepository.xlChunk;}
    get clCurrentPart(): number {return this.catRepository.chunkCurrentPart;}
    set clCurrentPart(v: number) {this.catRepository.chunkCurrentPart = v;}
    get clAllLength(): number {return this.catRepository.allLength;}  
    get clLength(): number {return this.catRepository.chunkLength;}   
    get clSortBy(): string {return this.catRepository.chunkSortBy;}
    get clSortDir(): number {return this.catRepository.chunkSortDir;}
    set clSortBy(v: string) {this.catRepository.chunkSortBy = v;}
    set clSortDir(v: number) {this.catRepository.chunkSortDir = v;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();     
        this.initCats();         
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-cats"]["title-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-cats"]["title-index"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initCats(): Promise<void> {
        try {
            this.clLoading = true;
            this.catRepository.filterRestaurantId = this.authService.authData.value.employee.restaurant_id;
            await this.catRepository.loadChunk();                     
            await this.appService.pause(500);
            this.clLoading = false;       
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.clSortBy === sortBy) {
            this.clSortDir *= -1;
        } else {
            this.clSortBy = sortBy;
            this.clSortDir = 1;
        }

        this.initCats();
    }

    public setSorting(i: string): void {
        let sorting = this.clSortingVariants[parseInt(i)];
        this.clSortBy = sorting[0];
        this.clSortDir = sorting[1];
        this.initCats();
    }

    public onDelete(c: Cat): void {
        this.deleteId = c.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${c.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.clLoading = true;            
            await this.catRepository.delete(this.deleteId);
            this.initCats();
        } catch (err) {
            this.appService.showError(err);
            this.clLoading = false;
        }
    }  

    public async updateParam (id: number, p: string, v: any): Promise<void> {        
        try {            
            await this.catRepository.updateParam(id, p, v);                        
        } catch (err) {
            this.appService.showError(err);
        }        
    }  
}