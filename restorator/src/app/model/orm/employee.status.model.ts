import { Model } from "../model";
import { IEmployeeStatusTranslation } from "./employee.status.translation.interface";

export class EmployeeStatus extends Model {
    public id: number;
    public color: string;
    public pos: number;    
    public translations?: IEmployeeStatusTranslation[];    

    public translationByLang(lang_id: number): IEmployeeStatusTranslation {        
        return this.translations.find(t => t.lang_id === lang_id);
    }
}