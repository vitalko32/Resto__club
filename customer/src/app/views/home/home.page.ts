import { Component, OnInit } from "@angular/core";
import { ICat } from "src/app/model/orm/cat.interface";
import { ITable } from "src/app/model/orm/table.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "home-page",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private catRepository: CatRepository,
        private orderService: OrderService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get cl(): ICat[] {return this.catRepository.xlAll;}
    get table(): ITable {return this.orderService.table;}

    public ngOnInit(): void {
        this.initIface();
        this.initCats();
    }

    private initIface(): void {
        this.appService.headBackLink = null;
        this.appService.setTitle(this.words['customer-home']['title']);
    }

    private async initCats(): Promise<void> {
        try {
            this.catRepository.filterRestaurantId = this.table.restaurant_id;
            this.catRepository.loadAll();
        } catch (err) {
            this.appService.showError(err);
        }
    }
}