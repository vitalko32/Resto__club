import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";

export interface IMailtemplateUpdateDTO {
    readonly id: number;
    readonly name: string;
    readonly translations: MailtemplateTranslation[];
}