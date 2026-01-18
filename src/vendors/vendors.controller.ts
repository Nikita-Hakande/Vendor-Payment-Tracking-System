// import {
//   Controller,
//   Get,
//   Post,
//   Put,
//   Delete,
//   Param,
//   Body,
//   ParseIntPipe,
// } from '@nestjs/common';
// import { VendorsService } from './vendors.service';
// import { Vendor } from './vendor.entity';

// @Controller('vendors')
// export class VendorsController {
//   constructor(private readonly vendorsService: VendorsService) {}

//   @Post()
//   createVendor(@Body() data: Partial<Vendor>) {
//     return this.vendorsService.create(data);
//   }

//   @Get()
//   getVendors() {
//     return this.vendorsService.findAll();
//   }

//   @Put(':id')
//   updateVendor(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() data: Partial<Vendor>,
//   ) {
//     return this.vendorsService.update(id, data);
//   }

//   @Delete(':id')
//   deleteVendor(@Param('id', ParseIntPipe) id: number) {
//     return this.vendorsService.delete(id);
//   }
// }



import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) { }

  @Post()
  create(@Body() body: CreateVendorDto) {
    return this.vendorsService.create(body);
  }

  @Get()
  findAll() {
    return this.vendorsService.findAll();
  }

  // 🔥 GET /vendors/:id (WITH PAYMENT SUMMARY)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vendorsService.findOneWithSummary(id);
  }

  // 🔥 PUT /vendors/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateVendorDto,
  ) {
    return this.vendorsService.update(id, body);
  }
}
