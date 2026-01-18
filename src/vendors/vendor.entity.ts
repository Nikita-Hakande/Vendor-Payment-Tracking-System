import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseOrder } from '../purchase-orders/purchase-order.entity';

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contactPerson: string;

  @Column()
  phone: string;

  @Column()
  paymentTerms: number;

  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active',
  })
  status: 'Active' | 'Inactive';


  @OneToMany(() => PurchaseOrder, (po) => po.vendor)
  purchaseOrders: PurchaseOrder[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
