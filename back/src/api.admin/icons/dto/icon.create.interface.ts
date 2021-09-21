import { IconTranslation } from "src/model/orm/icon.translation.entity";

export interface IIconCreate {
    readonly img: string;
    readonly pos: number;
    readonly translations: IconTranslation[];
}