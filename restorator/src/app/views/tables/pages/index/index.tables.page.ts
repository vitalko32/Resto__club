import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ICoord } from "src/app/model/coord.interface";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Table } from "src/app/model/orm/table.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "index-tables-page",
    templateUrl: "index.tables.page.html",
    styleUrls: ["index.tables.page.scss", "../../../../common.styles/data.scss"],
})
export class IndexTablesPage implements OnInit, OnDestroy {
    public ready: boolean = false;
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public currentHall: Hall = null;
    public places: ICoord[] = [];
    public tableCreatePanelActive: boolean = false;
    public tableNew: Table = null;
    public tableDeleteId: number = null;
    public tableDeleteConfirmActive: boolean = false;
    public tableDeleteConfirmMsg: string = "";
    public tableQr: Table = null;
    public tableQrPanelActive: boolean = false;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,
        private hallRepository: HallRepository,      
        private orderRepository: OrderRepository,      
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
        await this.appService.pause(500);
        this.ready = true;
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
                this.places.push({x: j, y: i});
            }
        }
    }

    public currentHallSet(hall: Hall): void {
        this.currentHallId = hall.id;
        this.currentHall = hall;
        this.initPlaces();
    }

    public tableGet(place: ICoord): Table {        
        return this.currentHall.tables.find(t => t.x === place.x && t.y === place.y);
    }

    public async tableOnDrop(event: CdkDragDrop<any>, place: ICoord): Promise<void> {
        try {
            const tableId: number = event.item.data;
            
            if (tableId) {
                const table: Table = this.currentHall.tables.find(t => t.id === tableId);                    
                table.x = place.x;
                table.y = place.y;            
            } else {
                this.tableNew.x = place.x;
                this.tableNew.y = place.y;
                this.currentHall.tables.push(this.tableNew);
                this.tableNew = null;
            }            
            
            this.currentHall = await this.hallRepository.update(this.currentHall);                
        } catch (err) {
            this.appService.showError(err);
        }        
    }

    public tableCanDrop(place: ICoord): any {
        return (drag: CdkDrag, drop: CdkDropList) => !this.tableGet(place);
    }

    public tableCantDrop(drag: CdkDrag, drop: CdkDropList): boolean {
        return false;
    }

    public tableOnDelete(t: Table): void {
        this.tableDeleteId = t.id;
        this.tableDeleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} ${this.words['restorator-tables']['table'][this.currentLang.slug]} #${t.no}?`;
        this.tableDeleteConfirmActive = true;
    }

    public async tableDelete(): Promise<void> {
        try {
            this.tableDeleteConfirmActive = false;
            let index = this.currentHall.tables.findIndex(t => t.id === this.tableDeleteId);
            this.currentHall.tables.splice(index, 1);
            this.hallRepository.update(this.currentHall);
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public tableOnQr(t: Table): void {
        this.tableQr = t;
        this.tableQrPanelActive = true;
    }

    public tableOnHistory(t: Table): void {
        this.orderRepository.filterHallId = this.currentHallId;
        this.orderRepository.filterTableId = t.id;
        this.router.navigateByUrl("/orders/all");
    }
}