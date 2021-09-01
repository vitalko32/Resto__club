import { Model } from "../model";
import { Currency } from "./currency.model";

export class Restaurant extends Model {
    public id: number;
    public name: string;
    public currency: Currency;
    public active_until: Date;    
    public active: boolean;

    get formattedActiveUntil(): string {return this.active_until ? `${this.twoDigits(this.active_until.getDate())}.${this.twoDigits(this.active_until.getMonth()+1)}.${this.active_until.getFullYear()} ${this.twoDigits(this.active_until.getHours())}:${this.twoDigits(this.active_until.getMinutes())}` : "";}
    get daysLeft(): number {return this.active_until ? Math.round((this.active_until.getTime() - (new Date().getTime())) / (24 * 60 * 60 * 1000)) : -999999999;}

    public build (o: Object): any {
        for (let field in o) {
            if (field === "active_until") {
                this[field] = o[field] ? new Date (o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }    
}