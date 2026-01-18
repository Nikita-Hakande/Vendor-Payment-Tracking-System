import { IsPositive, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
    @IsNotEmpty()
    purchaseOrderId: number;

    @IsPositive()
    amount: number;

    @IsDateString()
    paymentDate: string;
}
