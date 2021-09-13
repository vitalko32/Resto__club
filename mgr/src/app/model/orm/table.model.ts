import { Model } from '../model';

export class Table extends Model {
    public id: number;
    public hall_id: number;
    public no: number;
    public seats: number;
    public x: number;
    public y: number;

    public init(): Table {
        this.no = 0;
        this.seats = 0;
        this.x = 0;
        this.y = 0;
        
        return this;
    }
}