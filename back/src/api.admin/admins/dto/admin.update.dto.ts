export interface IAdminUpdateDTO {    
    readonly id: number;
    readonly admingroup_id: number;    
    readonly name: string;
    readonly email: string;
    readonly password: string; 
    readonly img: string;
    readonly img_s: string;
    readonly active: boolean;        
}
