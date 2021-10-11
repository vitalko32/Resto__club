import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
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
export class CatComponent implements OnChanges, OnInit, OnDestroy {
    @Input() x: Cat;    
    @Input() il: Icon[];
    @Input() loading: boolean = false;      
    @Input() cmdSave: BehaviorSubject<boolean> = null;           
    @Output() save: EventEmitter<void> = new EventEmitter();    

    private cmdSaveSubscription: Subscription = null;
    public errorName: boolean = false;        
    public ilActive: boolean = false;
    public ilFilter: string = "";
    public ilFiltered: Icon[] = [];    

    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,            
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;} 
    
    public ngOnInit(): void {
        this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.onSave() : null);
    }

    public ngOnDestroy(): void {
        this.cmdSaveSubscription?.unsubscribe();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.ilFiltered = this.il;
        this.ilFilter = "";
    }

    public onSave(): void {
        if (this.validate()) {
            this.save.emit();
        }        
    }  

    private validate(): boolean {
        let error = false;
        this.x.name = this.appService.trim(this.x.name);        

        if (!this.x.name.length) {
            this.errorName = true;
            error = true;
        } else {
            this.errorName = false;
        }

        return !error;
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