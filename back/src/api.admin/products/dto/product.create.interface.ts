import { Ingredient } from "src/model/orm/ingredient.entity";
import { ProductImage } from "src/model/orm/product.image.entity";

export interface IProductCreate {
    readonly restaurant_id: number;
    readonly cat_id: number;
    readonly code: string;
    readonly name: string;
    readonly price: number;
    readonly weight: number;
    readonly cal: number;
    readonly time: string;
    readonly about: string;    
    readonly pos: number;
    readonly active: boolean;
    readonly recommended: boolean;
    readonly likes: number;
    readonly images: ProductImage[];
    readonly ingredients: Ingredient[];
}