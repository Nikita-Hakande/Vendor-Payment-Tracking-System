import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepo: Repository<Vendor>,
  ) { }

  // CREATE VENDOR
  async create(data: any) {
    const allowedTerms = [7, 15, 30, 45, 60];

    if (!allowedTerms.includes(data.paymentTerms)) {
      throw new InternalServerErrorException(
        'Invalid payment terms. Allowed: 7, 15, 30, 45, 60',
      );
    }

    try {
      const vendor = this.vendorRepo.create({
        name: data.name,
        email: data.email,
        contactPerson: data.contactPerson,
        phone: data.phone,
        paymentTerms: data.paymentTerms,
        status: 'Active',
      });

      return await this.vendorRepo.save(vendor);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'Vendor name or email already exists',
        );
      }
      throw error;
    }

  }

  // GET ALL VENDORS
  findAll() {
    return this.vendorRepo.find();
  }

  // UPDATE VENDOR
  async update(id: number, data: any) {
    const vendor = await this.vendorRepo.findOne({ where: { id } });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    Object.assign(vendor, data);
    return this.vendorRepo.save(vendor);
  }

  // GET VENDOR WITH PAYMENT SUMMARY
  async findOneWithSummary(id: number) {
    const vendor = await this.vendorRepo.findOne({
      where: { id },
      relations: ['purchaseOrders', 'purchaseOrders.payments'],
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    let totalPOAmount = 0;
    let totalPaid = 0;

    for (const po of vendor.purchaseOrders || []) {
      totalPOAmount += Number(po.totalAmount);

      for (const payment of po.payments || []) {
        totalPaid += Number(payment.amount);
      }
    }

    return {
      vendor,
      summary: {
        totalPOAmount,
        totalPaid,
        outstanding: totalPOAmount - totalPaid,
      },
    };
  }
}
