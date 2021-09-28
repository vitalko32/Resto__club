import { ServingTranslation } from "src/model/orm/serving.translation.entity";

export interface IServingUpdate {
    readonly id: number;
    readonly pos: number;
    readonly translations: ServingTranslation[];
}