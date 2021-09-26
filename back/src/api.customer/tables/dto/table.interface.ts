export interface ITable {
    readonly id: number;
    readonly no: number;
    readonly seats: number;
    readonly code: string;    
    readonly hall_id: number;    
    readonly restaurant_id: number;
}