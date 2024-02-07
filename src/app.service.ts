import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserData } from 'extended-request';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {

  }

  async update(deposits: number ,user: UserData) {
    if(![5,10,20,50,100].includes(deposits)){
      throw new BadRequestException('machine only accept 5,10,20,50 or 100 cent coins ')
    }
    try {
      await this.prismaService.users.update({
        data: {
          deposit: {increment: deposits}
        },
        where: {
          username: user.username
        }
      })
      return `balance updated`;
    } catch (error) {
      throw new BadRequestException("user not found")
    }
  }


  async buy(productId: number, amount: number, user: UserData){
      try {
        const product = await this.prismaService.product.findUnique({
          where:{
            id: productId
          }
        })
        
        const userbalance = await this.prismaService.users.findUnique({
          where:{
            username:user.username
          }
        })
        if(!product){
          throw new NotFoundException('product not found')
        }
        if(product.amountAvailable > amount){
          if(userbalance.deposit > product.cost * amount){
            const [flag1, flag2] = await this.prismaService.$transaction([
              this.prismaService.product.update({
                data: {
                  amountAvailable: {decrement: amount}
                },
                where: {
                  id: productId
                }
              }),
              this.prismaService.users.update({
                data:{
                  deposit: {decrement: (product.cost * amount)}
                },
                where:{
                  username: user.username
                }
              })
            ])
            if(flag1 && flag2){
              const totalspent = product.cost * amount 
              const productname = product.porductName
              var remaining = userbalance.deposit - (totalspent)
              var change = new Array
              while(remaining > 0){

                if(remaining % 100 == 0){
                  change.push(100)
                  remaining = remaining - 100 
                  continue;
                }

                if(remaining % 50 == 0){
                  change.push(50)
                  remaining = remaining - 50 
                  continue;
                }

                if(remaining % 20 == 0){
                  change.push(20)
                  remaining = remaining - 20
                  continue;
                }
                
                if(remaining % 10 == 0){
                  change.push(10)
                  remaining = remaining - 10
                  continue;
                }

                if(remaining % 5 == 0){
                  change.push(5)
                  remaining = remaining - 5
                  continue;
                }
              }
              return `total amount spent: ${totalspent} \n Product: ${productname} \n amount: ${amount} \n change: ${change}`
            }
          }
          else{
            throw new UnauthorizedException('your balance is not enough')
          }
        }
        else{
          throw new UnauthorizedException('insufficient product amount')
        }
      } catch (error) {
        throw new NotFoundException(error)
      }
  }

  async reset(user: UserData){
    try {
      await this.prismaService.users.update({
        data: {
          deposit: 0
        },
        where: {
          username: user.username
        }
      })
      return 'deposit reseted'
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
