import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Payment } from './payments/payment.entity';

import { Vendor } from './vendors/vendor.entity';
import { PurchaseOrder } from './purchase-orders/purchase-order.entity';

import { VendorsModule } from './vendors/vendors.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { PaymentsModule } from './payments/payments.module';

console.log({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_NAME: process.env.DB_NAME,
});

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      entities: [Vendor, PurchaseOrder, Payment],

      synchronize: true,
    }),



    // Feature modules
    VendorsModule,
    PurchaseOrdersModule,
    PaymentsModule,
  ],
})
export class AppModule { }
