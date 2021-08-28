import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-prolong",
    templateUrl: "prolong.component.html",
    styleUrls: ["../../../../common.styles/popup.scss", "prolong.component.scss"],
})
export class ProlongComponent implements OnChanges {
    @Input() restaurant: Restaurant = null;
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() prolong: EventEmitter<void> = new EventEmitter();
    public days: number = 0;
    public months: number = 0;
    public years: number = 0;
    public from: Date = null;        

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,        
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get to(): Date {
        let date = new Date(this.from);
        date = this.addDays(date, this.days);
        date = this.addMonths(date, this.months);
        date = this.addYears(date, this.years);
        return date;
    }
    get formattedFrom(): string {return this.appService.formattedDate(this.from);}
    get formattedTo(): string {return this.appService.formattedDate(this.to);}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.restaurant && this.restaurant) {
            this.days = this.months = this.years = 0;            
            let now = new Date();
            
            if (this.restaurant.active_until) {
                this.from = (this.restaurant.active_until.getTime() < now.getTime()) ? now : this.restaurant.active_until;            
            } else {
                this.from = now;
            }            
        }
    }

    public close(): void {
        this.activeChange.emit(false);
    }

    public async apply(): Promise<void> {
        this.prolong.emit();
    }

    private addDays(date: Date, days: number): Date {
        let newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    private addMonths(date: Date, months: number): Date {
        let newDate = new Date(date);
        newDate.setMonth(date.getMonth() + months);
        return newDate;
    }

    private addYears(date: Date, years: number): Date {
        let newDate = new Date(date);
        newDate.setFullYear(date.getFullYear() + years);
        return newDate;
    }
}