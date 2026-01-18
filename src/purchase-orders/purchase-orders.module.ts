import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { Vendor } from '../vendors/vendor.entity';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrdersService } from './purchase-orders.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PurchaseOrder, Vendor]),
    ],
    controllers: [PurchaseOrdersController],
    providers: [PurchaseOrdersService],
    exports: [TypeOrmModule],
})
export class PurchaseOrdersModule { }
