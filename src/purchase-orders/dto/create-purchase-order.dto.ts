import {
    IsInt,
    IsArray,
    ValidateNested,
    IsDateString,
    ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseOrderItemDto } from './purchase-order-item.dto';

export class CreatePurchaseOrderDto {
    @IsInt()
    vendorId: number;

    @IsDateString()
    poDate: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => PurchaseOrderItemDto)
    items: PurchaseOrderItemDto[];
}
