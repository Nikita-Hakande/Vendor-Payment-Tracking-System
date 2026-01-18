import {
    IsOptional,
    IsString,
    IsEmail,
    IsIn,
} from 'class-validator';

export class UpdateVendorDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    contactPerson?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsIn([7, 15, 30, 45, 60])
    paymentTerms?: number;

    @IsOptional()
    @IsIn(['Active', 'Inactive'])
    status?: 'Active' | 'Inactive';
}
