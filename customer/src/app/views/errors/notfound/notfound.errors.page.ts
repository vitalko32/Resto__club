import { Component, OnInit } from "@angular/core";
import { ITable } from "src/app/model/orm/table.interface";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";

@Component({
    selector: "notfound-errors-page",
    templateUrl: "notfound.errors.page.html",
})
export class NotfoundErrorsPage implements OnInit {
    constructor(
        private appService: AppService,
        private orderService: OrderService,
    ) {}

    get table(): ITable {return this.orderService.table;}

    public ngOnInit(): void {
        this.appService.setTitle("404");
        this.appService.headBackLink = `/table/${this.table.code}`;
    }
}