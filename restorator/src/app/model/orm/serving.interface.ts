import { IServingTranslation } from "./serving.translation.interface";

export interface IServing {
    readonly id: number;    
    readonly pos: number;    
    readonly defended: boolean;
    readonly translations?: IServingTranslation[];    
}