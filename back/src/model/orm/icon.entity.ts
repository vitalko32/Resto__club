import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IconTranslation } from "./icon.translation.entity";

@Entity({name: "vne_icons"})
export class Icon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    img: string;

    @Column({nullable: false, default: 0})
    pos: number;

    // relations    
    @OneToMany(type => IconTranslation, translation => translation.icon, {cascade: true})
    translations: IconTranslation[];
}