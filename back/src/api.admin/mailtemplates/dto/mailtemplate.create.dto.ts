import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";

export interface IMailtemplateCreateDTO {
    readonly name: string;
    readonly translations: MailtemplateTranslation[];
}