import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Words } from "src/app/model/orm/words.type";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-alert",
    templateUrl: "alert.component.html",
    styleUrls: ["../../common.styles/popup.scss"],
})
export class AlertComponent {
    @Input() active: boolean = false;
    @Input() msg: string = "";
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();

    constructor(private wordRepository: WordRepository) {}

    get words(): Words {return this.wordRepository.words;}    

    public close(): void {
        this.activeChange.emit(false);
    }
}