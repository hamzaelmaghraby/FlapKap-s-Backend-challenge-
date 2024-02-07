import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserData } from 'extended-request';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {
  }
  async create(createProductDto: CreateProductDto, user: UserData) {
    try {
      await this.prismaService.product.create({
        data: {
          porductName: createProductDto.productName,
          cost: createProductDto.cost,
          amountAvailable: createProductDto.amountAvailable,
          sellerId: user.id 
        }
      })
      return 'new product created';
    } catch (error) {
      throw new BadRequestException('product name already exsits')
    }
    
  }

  async findAll() {
    try {
      const products = await this.prismaService.product.findMany({})
      return products;
    } catch (error) {
      throw new BadRequestException('the machine is empty')
    }
  }

  async update(ids: number, updateProductDto: UpdateProductDto, user: UserData) {
    try {
      const sellerProducts = await this.prismaService.product.findUnique({
        where:{
          id: ids,
        }
      })

      if(!sellerProducts){
        throw new NotFoundException('check productId')
      }
      
      if(sellerProducts.sellerId == user.id){
        await this.prismaService.product.update({
          data: {
            porductName: updateProductDto.productName,
            cost: updateProductDto.cost,
            amountAvailable: updateProductDto.amountAvailable
          },
          where: {
              id: ids
          }
        })
        return 'product updated successfully '
      }
      else{
        throw new UnauthorizedException('you dont have permission to edit this product')
      }
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async remove(ids: number, user: UserData) {
    try {
      const sellerProducts = await this.prismaService.product.findUnique({
        where:{
          id: ids,
        }
      })

      if(!sellerProducts){
        throw new NotFoundException('check productId')
      }
      
      if(sellerProducts.sellerId == user.id){
        await this.prismaService.product.delete({
          where: {
              id: ids
          }
        })
        return 'product deleted successfully '
      }
      else{
        throw new UnauthorizedException('you dont have permission to edit this product')
      }
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
