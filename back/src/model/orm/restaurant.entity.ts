import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Currency } from "./currency.entity";

@Entity({name: "vne_restaurants"})
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    currency_id: number;

    @Index()
    @Column({nullable: true, default: null})
    name: string;

    @Index()
    @Column({nullable: true, default: null})
    domain: string;

    @Column({nullable: true, default: null})
    ownername: string;

    @Column({nullable: true, default: null})
    phone: string;

    @Column({nullable: true, default: null})
    address: string;

    @Column({nullable: true, default: null})
    inn: string;

    @Column({nullable: true, default: null})
    ogrn: string;

    @Column({nullable: true, default: null, type: "text"})
    comment: string;

    @Column({nullable: true, default: null, type: "timestamp"})
    active_until: Date;

    @Column({nullable: true, default: null, type: "timestamp"})
    created_at: Date;    

    // relations
    @ManyToOne(type => Currency, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "currency_id"})
    currency: Currency;
}
