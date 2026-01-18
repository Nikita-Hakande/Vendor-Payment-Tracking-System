import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Vendor } from '../vendors/vendor.entity';
import { Payment } from '../payments/payment.entity';

export enum PurchaseOrderStatus {
    DRAFT = 'Draft',
    APPROVED = 'Approved',
    PARTIALLY_PAID = 'Partially Paid',
    FULLY_PAID = 'Fully Paid',
}

@Entity('purchase_orders')
export class PurchaseOrder {
    @PrimaryGeneratedColumn()
    id: number;

    // ✅ REQUIRED
    @Column({ unique: true })
    poNumber: string;

    @ManyToOne(() => Vendor, (vendor) => vendor.purchaseOrders, {
        nullable: false,
    })
    vendor: Vendor;

    @Column({ type: 'date' })
    poDate: Date;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    totalAmount: number;

    @Column({ type: 'date' })
    dueDate: Date;

    @Column({
        type: 'enum',
        enum: PurchaseOrderStatus,
        default: PurchaseOrderStatus.DRAFT,
    })
    status: PurchaseOrderStatus;

    // ✅ REQUIRED (JSON items)
    @Column({
        type: 'jsonb',
        nullable: true,
        default: () => "'[]'",
    })
    items: {
        description: string;
        quantity: number;
        unitPrice: number;
    }[];


    @OneToMany(() => Payment, (payment) => payment.purchaseOrder)
    payments: Payment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
