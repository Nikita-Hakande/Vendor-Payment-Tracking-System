import { IsString, IsInt, Min, IsNumber } from 'class-validator';

export class PurchaseOrderItemDto {
    @IsString()
    description: string;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    unitPrice: number;
}
