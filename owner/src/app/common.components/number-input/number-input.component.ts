import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "number-input",
    templateUrl: "number-input.component.html",
    styleUrls: ["number-input.component.scss"],
})
export class NumberInputComponent {
    @Input() value: number = 0;
    @Input() min: number = 0;
    @Input() max: number = 999999999;
    @Output() valueChange: EventEmitter<number> = new EventEmitter();    

    public increase(): void {
        if (this.value < this.max) {
            this.value++;
            this.valueChange.emit(this.value);
        }
    }

    public decrease(): void {
        if (this.value > this.min) {
            this.value--;
            this.valueChange.emit(this.value);
        }
    }
}