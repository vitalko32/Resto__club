import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICat } from "src/app/model/orm/cat.interface";
import { ITable } from "src/app/model/orm/table.interface";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "cat-page",
    templateUrl: "cat.page.html",
    styleUrls: ["cat.page.scss"],
})
export class CatPage implements OnInit {
    public cat: ICat = null;
    
    constructor(
        private appService: AppService,
        private orderService: OrderService,
        private catRepository: CatRepository,
        private wordRepository: WordRepository,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    get table(): ITable {return this.orderService.table;}

    public ngOnInit(): void {
        this.initIface();
        this.initCat();
    }

    private initIface(): void {
        this.appService.backLink = `/table/${this.table.code}`;
    }

    private async initCat(): Promise<void> {
        try {            
            this.cat = await this.catRepository.loadOne(this.route.snapshot.params["id"]);
            this.appService.setTitle(this.cat.name);
        } catch (err) {
            err === 404 ? this.router.navigateByUrl(`/table/${this.table.code}/error/404`) : null;
            this.appService.showError(err);
        }
    }
}