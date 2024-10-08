import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import * as Sortable from "sortablejs";
import { SortableOptions } from "sortablejs";
import { IAnswer } from "src/app/model/dto/answer.interface";
import { IPathable } from "src/app/model/dto/pathable.interface";
import { IHTMLInputEvent } from "src/app/model/htmlinputevent.interface";
import { Ingredient } from "src/app/model/orm/ingredient.model";
import { Lang } from "src/app/model/orm/lang.model";
import { ProductImage } from "src/app/model/orm/product.image.model";
import { Product, ProductUnit } from "src/app/model/orm/product.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { FilesService } from "src/app/services/files.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-product",
    templateUrl: "product.component.html",
    styleUrls: ["product.component.scss"],
})
export class ProductComponent implements OnInit, OnDestroy {
    @Input() x: Product;        
    @Input() loading: boolean = false;    
    @Input() cmdSave: BehaviorSubject<boolean> = null;
    @Output() save: EventEmitter<void> = new EventEmitter();        

    private cmdSaveSubscription: Subscription = null;
    public errorName: boolean = false;    
    public unitG: ProductUnit = ProductUnit.g;
    public unitMl: ProductUnit = ProductUnit.ml;
    
    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,        
        protected filesService: FilesService,    
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}        
    
    public ngOnInit(): void {
        this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.onSave() : null);
    }

    public ngOnDestroy(): void {
        this.cmdSaveSubscription?.unsubscribe();
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
    
    // images
    @ViewChild("imgupload") imgUploadElementRef: ElementRef;
    public imgLoading: boolean = false;    
    private imgFolder: string = "products";
    private imgResizeWidth: number[] = [500];
    public imgDeleteConfirmActive: boolean = false;
    public imgDeleteIndex: number = null;
    public imgSortableOptions: SortableOptions = {
        onUpdate: this.imgOnSortableUpdate.bind(this),      
        onMove: this.imgOnSortableMove,    
        animation: 150,
        handle: ".de-image-handle",
    };
    
    public imgOnUploadClick(): void {                
        this.imgUploadElementRef.nativeElement.click();        
    }
    
    public imgUpload(event: IHTMLInputEvent): void {        
        let file: File = <File>event.target.files[0];                
        
        if (this.imgValidate(file)) {
            this.imgLoading = true;
            let fd: FormData = new FormData ();
            fd.append("folder", this.imgFolder);
            fd.append("file", file, file.name);            
            fd.append("resize", JSON.stringify(this.imgResizeWidth));        
            this.filesService
                .imgUploadResize(fd)
                .subscribe (
                    event => this.imgProcessResponse(event), 
                    err => {
                        this.appService.showError(err.message); 
                        this.imgLoading = false;
                    });            
        }        
    }

    public async imgProcessResponse(event: HttpEvent<IAnswer<IPathable>>): Promise<void> {        
        if (event.type === HttpEventType.Response) {
            this.imgLoading = false;
            
            if (event.body.statusCode !== 200) {                        
                this.appService.showError(event.body.error);                
                return;
            } 
                
            const newImage = new ProductImage();
            newImage.img = event.body.data.paths[0];
            newImage.pos = this.x.images.length ? Math.max(...this.x.images.map(i => i.pos)) + 1 : 0;            
            // костыль под глюк в sortable, иначе при добавлении рушится порядок
            const temp = this.x.images;
            this.x.images = [];
            temp.push(newImage);
            await this.appService.pause(1);
            this.x.images = temp;            
        } 
    }

    public imgValidate(file: File): boolean {        
        return file && ["image/jpeg","image/png"].includes(file.type); 
    }  

    public imgOnDelete(i: number): void {
        this.imgDeleteIndex = i;
        this.imgDeleteConfirmActive = true;
    }
    
    public imgDelete(): void {
        this.imgDeleteConfirmActive = false;
        this.x.images.splice(this.imgDeleteIndex, 1);
    }

    private imgOnSortableUpdate(): void {
        this.x.images.forEach((img, index) => img.pos = index);
    }

    public imgOnSortableMove(event: Sortable.MoveEvent, originalEvent: any): boolean {                
        return !event.related.classList.contains("de-image-add");                
    }

    // ingredients
    public ingreDeleteConfirmActive: boolean = false;
    public ingreDeleteConfirmMsg: string = "";
    public ingreDeleteIndex: number = null;        

    public async ingreAdd(): Promise<void> {
        const ingredient = new Ingredient();
        ingredient.name = "";
        ingredient.excludable = false;
        ingredient.pos = this.x.ingredients.length ? Math.max(...this.x.ingredients.map(i => i.pos)) + 1 : 0;
        this.x.ingredients.push(ingredient);        
    }

    public ingreOnDelete(i: number): void {
        this.ingreDeleteIndex = i;
        this.ingreDeleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${this.x.ingredients[i].name}"?`;
        this.ingreDeleteConfirmActive = true;
    }

    public ingreDelete(): void {
        this.ingreDeleteConfirmActive = false;
        this.x.ingredients.splice(this.ingreDeleteIndex, 1);
    }    

    public ingreOnDrop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.x.ingredients, event.previousIndex, event.currentIndex);
        this.x.ingredients.forEach((ingredient, index) => ingredient.pos = index);           
    }
}