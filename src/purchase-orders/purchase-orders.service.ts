// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { PurchaseOrder } from './purchase-order.entity';
// import { Vendor } from '../vendors/vendor.entity';

// @Injectable()
// export class PurchaseOrdersService {
//     constructor(
//         @InjectRepository(PurchaseOrder)
//         private readonly purchaseOrderRepository: Repository<PurchaseOrder>,

//         @InjectRepository(Vendor)
//         private readonly vendorRepository: Repository<Vendor>,
//     ) { }

//     async create(data: any) {
//         const vendor = await this.vendorRepository.findOne({
//             where: { id: data.vendorId },
//         });

//         if (!vendor) {
//             throw new NotFoundException('Vendor not found');
//         }

//         const purchaseOrder = this.purchaseOrderRepository.create({
//             poNumber: data.poNumber,
//             vendor,
//             poDate: data.poDate,
//             totalAmount: data.totalAmount,
//             dueDate: data.dueDate,
//         });

//         return this.purchaseOrderRepository.save(purchaseOrder);
//     }

//     async findAll() {
//         return this.purchaseOrderRepository.find({
//             relations: ['vendor', 'payments'],
//         });
//     }

//     async findOne(id: number) {
//         const po = await this.purchaseOrderRepository.findOne({
//             where: { id },
//             relations: ['vendor', 'payments'],
//         });

//         if (!po) {
//             throw new NotFoundException('Purchase Order not found');
//         }

//         return po;
//     }
// }


import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    PurchaseOrder,
    PurchaseOrderStatus,
} from './purchase-order.entity';
import { Vendor } from '../vendors/vendor.entity';
import { CreatePurchaseOrderDto } from './create-purchase-order.dto';

@Injectable()
export class PurchaseOrdersService {
    constructor(
        @InjectRepository(PurchaseOrder)
        private readonly purchaseOrderRepository: Repository<PurchaseOrder>,

        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
    ) { }

    // ✅ PO number auto-generator
    private generatePoNumber(): string {
        const date = new Date();
        const ymd = date.toISOString().slice(0, 10).replace(/-/g, '');
        const rand = Math.floor(100 + Math.random() * 900);
        return `PO-${ymd}-${rand}`;
    }

    async create(dto: CreatePurchaseOrderDto) {
        const vendor = await this.vendorRepository.findOne({
            where: { id: dto.vendorId },
        });

        if (!vendor) {
            throw new NotFoundException('Vendor not found');
        }

        // 🚫 BLOCK INACTIVE VENDOR
        if (vendor.status === 'Inactive') {
            throw new BadRequestException(
                'Cannot create PO for inactive vendor',
            );
        }

        if (!dto.items || dto.items.length === 0) {
            throw new BadRequestException(
                'PO must contain at least one item',
            );
        }

        const totalAmount = dto.items.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice,
            0,
        );

        const poDate = new Date(dto.poDate);
        const dueDate = new Date(poDate);
        dueDate.setDate(dueDate.getDate() + vendor.paymentTerms);

        const poNumber = this.generatePoNumber();

        const po = this.purchaseOrderRepository.create({
            poNumber,
            vendor,
            poDate,
            dueDate,
            totalAmount,
            items: dto.items,
            status: PurchaseOrderStatus.DRAFT,
        });

        return this.purchaseOrderRepository.save(po);
    }



    async findAll() {
        return this.purchaseOrderRepository.find({
            relations: ['vendor', 'payments'],
        });
    }

    async findOne(id: number) {
        const po = await this.purchaseOrderRepository.findOne({
            where: { id },
            relations: ['vendor', 'payments'],
        });

        if (!po) {
            throw new NotFoundException('Purchase Order not found');
        }

        return po;
    }
}
