import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { PurchaseOrder, PurchaseOrderStatus } from '../purchase-orders/purchase-order.entity';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,

        @InjectRepository(PurchaseOrder)
        private readonly poRepo: Repository<PurchaseOrder>,
    ) { }

    async create(data: any) {
        // 1️⃣ Fetch Purchase Order WITH payments
        const purchaseOrder = await this.poRepo.findOne({
            where: { id: data.purchaseOrderId },
            relations: ['payments'],
        });

        if (!purchaseOrder) {
            throw new NotFoundException('Purchase Order not found');
        }

        // 2️⃣ Calculate total paid safely
        const totalPaid = (purchaseOrder.payments || []).reduce(
            (sum, p) => sum + Number(p.amount),
            0,
        );

        const remainingAmount =
            Number(purchaseOrder.totalAmount) - totalPaid;

        // 3️⃣ Validations
        if (Number(data.amount) <= 0) {
            throw new BadRequestException('Payment amount must be greater than zero');
        }

        if (Number(data.amount) > remainingAmount) {
            throw new BadRequestException(
                `Payment exceeds remaining amount. Remaining: ${remainingAmount}`,
            );
        }

        // 4️⃣ Create payment
        const payment = this.paymentRepo.create({
            purchaseOrder,
            amount: Number(data.amount),
            paymentDate: new Date(data.paymentDate),
            paymentMethod: data.paymentMethod, // IMPORTANT
            notes: data.notes,
        });

        const savedPayment = await this.paymentRepo.save(payment);

        // 5️⃣ Update PO status
        const newTotalPaid = totalPaid + Number(data.amount);

        purchaseOrder.status =
            newTotalPaid === Number(purchaseOrder.totalAmount)
                ? PurchaseOrderStatus.FULLY_PAID
                : PurchaseOrderStatus.PARTIALLY_PAID;

        await this.poRepo.save(purchaseOrder);

        return savedPayment;
    }

    async findAll() {
        return this.paymentRepo.find({
            relations: ['purchaseOrder'],
        });
    }

    async findOne(id: number) {
        const payment = await this.paymentRepo.findOne({
            where: { id },
            relations: ['purchaseOrder'],
        });

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        return payment;
    }
}
