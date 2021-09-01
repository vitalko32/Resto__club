import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "search-input",
    templateUrl: "search-input.component.html",
    styleUrls: ["search-input.component.scss"],
})
export class SearchInputComponent {
    @Input() value: string;
    @Input() cssClass: string = "block";
    @Output() valueChange: EventEmitter<string> = new EventEmitter();
    @Output() apply: EventEmitter<void> = new EventEmitter();

    public onChange(): void {
        this.valueChange.emit(this.value);
    }

    public onKeyDown(event: KeyboardEvent): void {        
        if (event.key === "Enter") {
            event.preventDefault();
            this.apply.emit();
        }        
    }
    
    public onReset(): void {
        this.value = "";  
        this.valueChange.emit(this.value);      
        this.apply.emit();
    }
}