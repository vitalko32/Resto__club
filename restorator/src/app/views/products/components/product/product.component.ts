import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import * as Sortable from "sortablejs";
import { SortableOptions } from "sortablejs";
import { IAnswer } from "src/app/model/dto/answer.interface";
import { IPathable } from "src/app/model/dto/pathable.interface";
import { IHTMLInputEvent } from "src/app/model/htmlinputevent.interface";
import { Lang } from "src/app/model/orm/lang.model";
import { ProductImage } from "src/app/model/orm/product.image.model";
import { Product } from "src/app/model/orm/product.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { FilesService } from "src/app/services/files.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-product",
    templateUrl: "product.component.html",
})
export class ProductComponent {
    @Input() x: Product;        
    @Input() loading: boolean = false;    
    @Input() errorName: boolean = false;    
    @Output() save: EventEmitter<void> = new EventEmitter();        
    
    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,        
        protected filesService: FilesService,    
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}            

    public onSave(): void {
        this.save.emit();
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

    public imgProcessResponse(event: HttpEvent<IAnswer<IPathable>>): void {        
        if (event.type === HttpEventType.Response) {
            this.imgLoading = false;
            
            if (event.body.statusCode !== 200) {                        
                this.appService.showError(event.body.error);                
                return;
            } 
                
            const newImage = new ProductImage();
            newImage.img = event.body.data.paths[0];
            newImage.pos = Math.max(...this.x.images.map(i => i.pos)) + 1;
            
            // костыль под глюк в sortable, иначе при добавлении рушится порядок
            const temp = this.x.images;
            temp.push(newImage);
            this.x.images = temp;
        } 
    }

    public imgValidate(file: File): boolean {        
        return file && ["image/jpeg","image/png"].includes(file.type); 
    }  

    public imgOnRemove(i: number): void {
        this.imgDeleteIndex = i;
        this.imgDeleteConfirmActive = true;
    }
    
    public imgRemove(): void {
        this.imgDeleteConfirmActive = false;
        this.x.images.splice(this.imgDeleteIndex, 1);
    }

    private imgOnSortableUpdate(): void {
        this.x.images.forEach((img, index) => img.pos = index);
    }

    public imgOnSortableMove(event: Sortable.MoveEvent, originalEvent: any): boolean {                
        return !event.related.classList.contains("de-image-add");                
    }
}