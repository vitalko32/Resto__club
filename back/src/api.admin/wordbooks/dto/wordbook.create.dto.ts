import { Word } from "src/model/orm/word.entity";

export interface IWordbookCreateDTO {    
    readonly name: string;
    readonly pos: number;
    readonly words: Word[];    
}
