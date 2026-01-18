import {
    IsArray,
    IsInt,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PurchaseOrderItemDto {
    @IsString()
    description: string;

    @IsInt()
    @IsPositive()
    quantity: number;

    @IsPositive()
    unitPrice: number;
}

export class CreatePurchaseOrderDto {
    @IsInt()
    vendorId: number;

    @IsString()
    poDate: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PurchaseOrderItemDto)
    items: PurchaseOrderItemDto[];
}
