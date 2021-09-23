import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { IAnswer } from 'src/app/model/answer.interface';
import { IHTMLInputEvent } from 'src/app/model/htmlinputevent.interface';
import { Cat } from 'src/app/model/orm/cat.model';
import { Ingredient } from 'src/app/model/orm/ingredient.model';
import { ProductImage } from 'src/app/model/orm/product.image.model';
import { Product } from 'src/app/model/orm/product.model';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { IPathable } from 'src/app/model/pathable.interface';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-product",
    templateUrl: "./product.component.html"
})
export class ProductComponent extends ObjectComponent<Product> {        
    @Input() rl: Restaurant[] = [];    
    public tab: number = 1;    
    get cl(): Cat[] {return this.rl.find(r => r.id === this.x.restaurant_id)?.cats || [];}
    
    
    // ingredients
    public ingredientsSortBy: string = "pos";
    public ingredientsSortDir: number = 1;   
    public ingredientsSubformActive: boolean = false;
    public ingredient: Ingredient = new Ingredient().init();

    public ingredientsOnSubformKeyDown(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            event.preventDefault();
            this.ingredientsAdd();
        }
    }

    public ingredientsAdd(): void {
        this.x.ingredients.push(this.ingredient);
        this.appService.sort(this.x.ingredients, this.ingredientsSortBy, this.ingredientsSortDir);
        this.ingredient = new Ingredient().init();
        this.ingredientsSubformActive = false;
    }

    public ingredientsChangeSorting(sortBy): void {
        if (sortBy === this.ingredientsSortBy) {
            this.ingredientsSortDir *= -1;            
        } else {
            this.ingredientsSortBy = sortBy;
            this.ingredientsSortDir = 1;
        }

        this.appService.sort(this.x.ingredients, this.ingredientsSortBy, this.ingredientsSortDir);
    }

    public ingredientsRemove(i: number): void {
        if (confirm(this.currentLang.phrases['workspace-sure'])) {
            this.x.ingredients.splice(i, 1);            
        }        
    }   

    // images   
    public imgSubformActive: boolean = false;
    public imgProgress: number = 0;
    public imgFolder: string = "products";	
	public imgResizeWidth: number[] = [500];    
    public img: ProductImage = new ProductImage().init();    

    public imgAdd(): void {
        this.x.images.push(this.img);   
        this.appService.sort(this.x.images, "pos", 1);             
        this.img = new ProductImage().init();
        this.imgSubformActive = false;   
        this.imgProgress = 0;           
    } 
    
    public imgOnSubformKeyDown(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            event.preventDefault();
            this.imgAdd();
        }
    }

    public imgRemove(i: number): void {
        if (confirm(this.currentLang.phrases['workspace-sure'])) {
            this.x.images.splice(i, 1);            
        }        
    }

    public imgDeleteImg(): void {
        this.img.img = null;        
        this.imgProgress = 0;
    }

    public imgUpload(event: IHTMLInputEvent): void {
        this.imgProgress = 0;
        let file: File = <File>event.target.files[0];        
        
        if (file) {
            let fd: FormData = new FormData ();
            fd.append ("folder", this.imgFolder);
            fd.append("resize", JSON.stringify(this.imgResizeWidth));
            fd.append ("file", file, file.name);
            this.appService.monitorLog(`uploading image ${file.name}...`);
            this.uploadService.uploadImg(fd).subscribe(event => {                
                if (event.type == HttpEventType.UploadProgress) {
                    this.imgProgress = Math.round (100 * event.loaded / event.total);                    
                } else if (event.type == HttpEventType.Response) {
                    const res: IAnswer<IPathable> = event.body;
    
                    if (res.statusCode === 200) {                        
                        this.appService.monitorLog(`uploaded: ${res.data.paths[0]}`);
                        this.img.img = res.data.paths[0];                        
                    } else {
                        this.appService.monitorLog (res.error, true);
                    }                    
                }                
            }, err => {
                this.appService.monitorLog (err.message, true);
            });            
        }  
    }  
}
