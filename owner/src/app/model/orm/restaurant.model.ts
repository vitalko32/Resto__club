import { Model } from "../model";

export class Restaurant extends Model {
    public id: number;
    public currency_id: number;
    public name: string;
    public domain: string;
    public ownername: string;
    public phone: string;
    public address: string;
    public inn: string;
    public ogrn: string;
    public comment: string;
    public active_until: Date;
    public created_at: Date;

    get formattedCreatedAt(): string {return this.created_at ? `${this.twoDigits(this.created_at.getDate())}.${this.twoDigits(this.created_at.getMonth()+1)}.${this.created_at.getFullYear()} ${this.twoDigits(this.created_at.getHours())}:${this.twoDigits(this.created_at.getMinutes())}` : "";}
    get formattedActiveUntil(): string {return this.active_until ? `${this.twoDigits(this.active_until.getDate())}.${this.twoDigits(this.active_until.getMonth()+1)}.${this.active_until.getFullYear()} ${this.twoDigits(this.active_until.getHours())}:${this.twoDigits(this.active_until.getMinutes())}` : "";}

    public build (o: Object): any {
        for (let field in o) {
            if (field === "active_until" || field === "created_at") {
                this[field] = o[field] ? new Date (o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }

    public init(): Restaurant {
        this.currency_id = 1;
        return this;
    }    
}