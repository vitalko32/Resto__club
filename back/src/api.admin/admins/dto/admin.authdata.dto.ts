import { Admin } from "../../../model/orm/admin.entity";

export interface IAdminAuthDataDTO {
    readonly admin: Admin;
    readonly token: string;    
}
