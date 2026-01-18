import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './create-purchase-order.dto';




@Controller('purchase-orders')
export class PurchaseOrdersController {
    constructor(
        private readonly purchaseOrdersService: PurchaseOrdersService,
    ) { }

    @Post()
    create(@Body() body: CreatePurchaseOrderDto) {
        return this.purchaseOrdersService.create(body);
    }

    @Get()
    findAll() {
        return this.purchaseOrdersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.purchaseOrdersService.findOne(id);
    }
}
