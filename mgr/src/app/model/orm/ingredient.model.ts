import { Model } from "../model";

export class Ingredient extends Model {
    public id: number;
    public product_id: number;
    public name: string;
    public pos: number;
    public excludable: boolean;

    public init(): Ingredient {
        this.pos = 0;
        this.excludable = false;
        
        return this;
    }
}