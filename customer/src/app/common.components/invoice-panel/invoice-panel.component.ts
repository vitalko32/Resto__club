import { Component } from "@angular/core";
import { IOrder, Paymethod } from "src/app/model/orm/order.interface";
import { ITable } from "src/app/model/orm/table.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { OrderService } from "src/app/services/order.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "invoice-panel",
    templateUrl: "invoice-panel.component.html",
    styleUrls: ["invoice-panel.component.scss"],
})
export class InvoicePanelComponent {
    public loading: boolean = false;
    public confirmPanelActive: boolean = false;
    public alertPanelActive: boolean = false;
    // пока заказ не отправлен на оплату, т.е. не имеет статуса need_invoice, клиент меняет способ оплаты на своей стороне как угодно
    // при отправке заказа на оплату будет отправлен и способ оплаты
    public payMethod: Paymethod = Paymethod.Cash;
    public payCash: Paymethod = Paymethod.Cash;
    public payCard: Paymethod = Paymethod.Card;

    constructor(
        private appService: AppService,
        private orderService: OrderService,
        private wordRepository: WordRepository,             
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get active(): boolean {return this.appService.invoicePanelActive;}
    set active(v: boolean) {this.appService.invoicePanelActive = v;}    
    get table(): ITable {return this.orderService.table;}
    get order(): IOrder {return this.orderService.order;}
    get orderSubtotal(): number {return this.orderService.orderSubtotal;}
    get orderTotal(): number {return this.orderService.orderTotal;}
    get orderDiscount(): number {return this.order.discount_percent;}
    get orderCreatedAt(): string {
        const date = new Date(this.order.created_at);
        return `${this.appService.twoDigits(date.getDate())}.${this.appService.twoDigits(date.getMonth()+1)}.${date.getFullYear()} ${this.appService.twoDigits(date.getHours())}:${this.appService.twoDigits(date.getMinutes())}`;
    }
    get substatuses(): string {
        if (this.order) {
            const sl: string[] = [];
            this.order.need_invoice ? sl.push(this.words["customer-invoice"]['need-invoice']) : null;
            this.order.need_waiter ? sl.push(this.words["customer-invoice"]['need-waiter']) : null;
            this.order.need_products ? sl.push(this.words["customer-invoice"]['need-products']) : null;
            return sl.join(", ");
        }

        return "";
    }

    public onOrderClose(): void {
        this.confirmPanelActive = true;
    }

    public async orderClose(): Promise<void> {
        try {
            this.confirmPanelActive = false;
            await this.appService.pause(300);
            this.loading = true;
            await this.orderService.orderClose(this.payMethod);
            this.loading = false;            
            this.active = false;
            this.alertPanelActive = true;
            await this.appService.pause(3000);
            this.alertPanelActive = false;
        } catch (err) {
            this.appService.showError(err);
            this.loading = false;
        }
    }
}