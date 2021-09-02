import { Model } from "../model";
import { Currency } from "./currency.model";

export class Restaurant extends Model {
    public id: number;
    public name: string;
    public money: number;
    public currency: Currency;    
}