import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { OrderProductIngredient } from "./order.product.ingredient.entity";

@Entity({name: "vne_order_products"})
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    order_id: number;

    @Column({nullable: true, default: null})
    serving_id: number;

    @Column({nullable: true, default: null})
    code: string;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: 0, type: "float"})
    price: number;

    @Column({nullable: false, default: 0})
    q: number;

    @Column({nullable: false, default: false})
    completed: boolean;

    // relations
    @ManyToOne(type => Order, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "order_id"})
    order: Order;

    @OneToMany(type => OrderProductIngredient, ingredient => ingredient.product, {cascade: true})
    ingredients: OrderProductIngredient[];
}