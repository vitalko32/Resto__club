import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";

@Component({
    selector: "cart-panel",
    templateUrl: "cart-panel.component.html",
    styleUrls: ["cart-panel.component.scss"],
})
export class CartPanelComponent {
    constructor(
        private appService: AppService,
        private orderService: OrderService,
    ) {}

    get active(): boolean {return this.appService.cartPanelActive;}
    set active(v: boolean) {this.appService.cartPanelActive = v;}    
}