import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { PurchaseOrder } from '../purchase-orders/purchase-order.entity';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PurchaseOrder, (po) => po.payments, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    purchaseOrder: PurchaseOrder;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'date' })
    paymentDate: Date;

    // 🔴 MUST be nullable to avoid sync error
    @Column({ nullable: false })
    paymentMethod: string;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;
}
