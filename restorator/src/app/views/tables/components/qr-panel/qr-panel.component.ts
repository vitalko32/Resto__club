import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Table } from "src/app/model/orm/table.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { SettingRepository } from "src/app/services/repositories/setting.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "qr-panel",
    templateUrl: "qr-panel.component.html",
    styleUrls: ["../../../../common.styles/popup.scss"],
})
export class QRPanelComponent {
    @Input() table: Table;
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();    

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,        
        private settingRepository: SettingRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get customerUrl(): string {return this.settingRepository.settings["customer-app-url"];}
    get qrtext(): string {return `${this.customerUrl}/table/${this.table.code}`;}
    get imgUrl(): string {return `/qr/get-image?text=${this.qrtext}&width=200&mode=get`;}
    get imgLink(): string {return `/qr/get-image?text=${this.qrtext}&width=300&mode=get`;}

    public close(): void {
        this.activeChange.emit(false);
    }
}