import { IOrderProductIngredient } from "./order.product.ingredient.interface";
import { IServing } from "./serving.interface";

export interface IOrderProduct {
    readonly id: number;
    readonly order_id: number;
    readonly serving_id: number;
    readonly code: string;
    readonly name: string;
    readonly img: string;
    readonly price: number;
    q: number;
    completed: boolean;
    readonly ingredients?: IOrderProductIngredient[];
    readonly serving?: IServing;
}