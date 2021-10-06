import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./cat.entity";
import { Currency } from "./currency.entity";
import { Employee } from "./employee.entity";
import { Hall } from "./hall.entity";
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

    @Column({nullable: false, default: 0, type: "float"})
    money: number;

    @Column({nullable: false, default: true})
    active: boolean;

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

    @OneToMany(type => Hall, hall => hall.restaurant, {cascade: false})
    halls: Hall[];

    @OneToMany(type => Cat, cat => cat.restaurant, {cascade: false})
    cats: Cat[];
}
