import { AfterViewInit, Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";

@Component({
    selector: "the-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"],
})
export class HeaderComponent implements AfterViewInit {        
    public scrollWidth: number = 0;
    
    constructor(
        private appService: AppService,
        private orderService: OrderService,
    ) {}
    
    get title(): string {return this.appService.headTitle;}    
    get backLink(): string {return this.appService.headBackLink;}
    get cartHighlight(): boolean {return this.appService.headCartHighlight;}    
    get cartQ(): number {return this.orderService.cartQ;}
    set cartPanelActive(v: boolean) {this.appService.cartPanelActive = v;}    

    public async ngAfterViewInit(): Promise<void> {
        await this.appService.pause(1);
        this.scrollWidth = this.appService.win.offsetWidth - this.appService.win.clientWidth;        
    }
}