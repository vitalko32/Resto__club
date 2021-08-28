import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Currency } from "./currency.entity";
import { Employee } from "./employee.entity";
import { Lang } from "./lang.entity";

@Entity({name: "vne_restaurants"})
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    currency_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Index()
    @Column({nullable: true, default: null})
    name: string;

    @Index()
    @Column({nullable: false, unique: true})
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

    @Index()
    @Column({nullable: true, default: null, type: "timestamp"})
    active_until: Date;

    @CreateDateColumn()
    created_at: Date;    

    // relations
    @ManyToOne(type => Currency, {onDelete: "RESTRICT", onUpdate: "CASCADE"})
    @JoinColumn({name: "currency_id"})
    currency: Currency;

    @ManyToOne(type => Lang, {onDelete: "RESTRICT", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;

    @OneToMany(type => Employee, employee => employee.restaurant, {cascade: true})
    employees: Employee[];
}
