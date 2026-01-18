import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    create(@Body() body: any) {
        return this.paymentsService.create(body);
    }

    @Get()
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.paymentsService.findOne(id);
    }
}
