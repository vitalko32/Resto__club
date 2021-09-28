import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";
import { Hall } from "./hall.entity";
import { OrderProduct } from "./order.product.entity";
import { Restaurant } from "./restaurant.entity";
import { Table } from "./table.entity";

export enum OrderStatus {
    Active = "active",
    Completed = "completed",
    Cancelled = "cancelled",    
}

@Entity({name: "vne_orders"})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    table_id: number;

    @Column({nullable: true, default: null})
    hall_id: number;

    @Column({nullable: true, default: null})
    restaurant_id: number;

    @Column({nullable: true, default: null})
    employee_id: number;

    @Column({nullable: true, default: null, type: "text"})
    customer_comment: string;

    @Column({nullable: true, default: null, type: "text"})
    employee_comment: string;

    @Column({nullable: false, default: false})
    need_waiter: boolean;

    @Column({nullable: false, default: false})
    need_invoice: boolean;

    @Index()
    @Column({type: "enum", enum: OrderStatus, nullable: false, default: OrderStatus.Active})
    status: OrderStatus;

    @Column({nullable: false, default: 0})
    discount_percent: number;

    @Column({nullable: true, default: null, type: "float"}) // вычисляется при закрытии
    final_sum: number;
    
    @Index()
    @CreateDateColumn()
    created_at: Date;
    
    @Index()
    @Column({nullable: true, default: null, type: "time without time zone"})
    completed_at: Date;

    // relations
    @ManyToOne(type => Table, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "table_id"})
    table: Table;

    @ManyToOne(type => Hall, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "hall_id"})
    hall: Hall;
    
    @ManyToOne(type => Restaurant, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @ManyToOne(type => Employee, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "employee_id"})
    employee: Employee;

    @OneToMany(type => OrderProduct, product => product.order, {cascade: true})
    products: OrderProduct[];
}