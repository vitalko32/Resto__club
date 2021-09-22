import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Cat } from "src/app/model/orm/cat.model";
import { Icon } from "src/app/model/orm/icon.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-cat",
    templateUrl: "cat.component.html",    
})
export class CatComponent implements OnChanges {
    @Input() x: Cat;    
    @Input() il: Icon[];
    @Input() loading: boolean = false;    
    @Input() errorName: boolean = false;    
    @Output() save: EventEmitter<void> = new EventEmitter();    
    public ilActive: boolean = false;
    public ilFilter: string = "";
    public ilFiltered: Icon[] = [];

    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,            
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}        

    public ngOnChanges(changes: SimpleChanges): void {
        this.ilFiltered = this.il;
        this.ilFilter = "";
    }

    public onSave(): void {
        this.save.emit();
    }  

    public getIcon(): string {
        return this.il.find(i => i.id === this.x.icon_id)?.img;
    }

    public ilApplyFilter(): void {
        this.ilFilter = this.ilFilter.trim();
        this.ilFiltered = this.ilFilter.length ? this.il.filter(i => (i.name[this.currentLang.slug] as string).toLowerCase().includes(this.ilFilter.toLowerCase())) : this.il;
    }

    public ilResetFilter(): void {
        this.ilFilter = "";
        this.ilApplyFilter();
    }
}