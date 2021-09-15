import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hall } from "./hall.entity";

@Entity({name: "vne_tables"})
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    hall_id: number;

    @Column({nullable: false, default: 0})
    no: number;

    @Column({nullable: false, default: 0})
    seats: number;

    @Column({nullable: false, default: 0})
    x: number;

    @Column({nullable: false, default: 0})
    y: number;
    
    @Column({nullable: true, default: null, unique: true})
    code: string;

    // relations
    @ManyToOne(type => Hall, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "hall_id"})
    hall: Hall;
}