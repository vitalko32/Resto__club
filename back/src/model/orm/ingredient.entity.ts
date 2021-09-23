import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name: "vne_ingredients"})
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    product_id: number;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: 0})
    pos: number;

    @Column({nullable: false, default: false})
    excludable: boolean;

    // relations
    @ManyToOne(type => Product, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "product_id"})
    product: Product;
}