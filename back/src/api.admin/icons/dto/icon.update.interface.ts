import { IconTranslation } from "src/model/orm/icon.translation.entity";

export interface IIconUpdate {
    readonly id: number;
    readonly img: string;
    readonly pos: number;
    readonly translations: IconTranslation[];
}