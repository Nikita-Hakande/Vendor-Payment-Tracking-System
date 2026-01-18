import { IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  contactPerson?: string;

  @IsOptional()
  phone?: string;

  @IsIn([7, 15, 30, 45, 60])
  paymentTerms: number;
}
