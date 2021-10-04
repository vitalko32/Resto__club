import { IIngredient } from "./ingredient.interface";
import { IProductImage } from "./product.image.interface";

export interface IProduct {
    readonly id: number;
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
    likes: number;

    readonly images?: IProductImage[];
    readonly ingredients?: IIngredient[];    

    _added: boolean;
    _timer: number;
}