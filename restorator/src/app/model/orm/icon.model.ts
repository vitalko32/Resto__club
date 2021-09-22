import { Model } from "../model";

export class Icon extends Model {
    public id: number;
    public img: string;
    public pos: number;    
    public name?: Object;
}