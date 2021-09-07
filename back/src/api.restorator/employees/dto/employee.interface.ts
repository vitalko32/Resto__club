import { IRestaurant } from "./restaurant.interface";

export interface IEmployee {
    readonly id: number;
    readonly restaurant_id: number;    
    readonly employee_status_id: number;
    readonly email: string;    
    readonly password: string;
    readonly name: string;    
    readonly phone: string;    
    readonly is_admin: boolean;    
    readonly created_at: Date;   
    readonly defended: boolean;
    readonly restaurant?: IRestaurant;
}