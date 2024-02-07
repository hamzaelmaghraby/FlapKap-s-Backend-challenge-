import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('SELLER')
  create(@Req() req: Request, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto,req.user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

 
  @Patch(':id')
  @Roles('SELLER')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: Request) {
    return this.productsService.update(+id, updateProductDto, req.user);
  }

  @Delete(':id')
  @Roles('SELLER')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.productsService.remove(+id, req.user);
  }
}
