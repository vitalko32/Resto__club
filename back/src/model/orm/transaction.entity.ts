import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

export enum TransactionType {
    Auto = "auto",
    Employee = "employee",
    Admin = "admin",    
}

@Entity({name: "vne_transactions"})
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    restaurant_id: number;

    @Column({type: "enum", enum: TransactionType, nullable: false, default: TransactionType.Auto})
    type: TransactionType;

    @Column({nullable: false, default: 0})
    amount: number;

    @CreateDateColumn()
    created_at: Date;    

    // relations
    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;
}