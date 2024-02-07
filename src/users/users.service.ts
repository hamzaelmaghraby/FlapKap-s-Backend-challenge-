import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from '@prisma/client';
import { UserData } from 'extended-request';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) {

  }

  async create(createUserDto: CreateUserDto) {
    if(createUserDto.deposit && ![5,10,20,50,100].includes(createUserDto.deposit))
      throw new BadRequestException('machine only accept 5,10,20,50 or 100 cent coins ')
    try {
      const hashedpassword = await bcrypt.hash(createUserDto.password, +process.env.SALT);
      await this.prismaService.users.create({
        data: {
          username: createUserDto.username,
          password: hashedpassword,
          deposit: createUserDto.deposit != null ? createUserDto.deposit:0 ,
          role: createUserDto.role
        },
      })
    } catch (error) {
      console.log(error)
      throw new BadRequestException('username already exists')
    }
    
    return 'new user created';
  }



  async findOne(user: UserData) {
    const customer = await this.prismaService.users.findUnique({
      where: {
        username: user.username
      },
    })
    return customer;
  }

  async update(updateUserDto: UpdateUserDto, user: UserData) {
    if(![5,10,20,50,100].includes(updateUserDto.deposit)){
      throw new BadRequestException('machine only accept 5,10,20,50 or 100 cent coins ')
    }
    try {
      await this.prismaService.users.update({
        data: {
          username: updateUserDto.username,
          password:updateUserDto.password,
          role: updateUserDto.role,
          deposit: {increment: updateUserDto.deposit}
        },
        where: {
          username: user.username
        }
      })
      return `user updated`;
    } catch (error) {
      throw new BadRequestException("user not found")
    }
  }

  async remove(user: UserData) {
    try {
      await this.prismaService.users.delete({
        where: {
          username: user.username
        }
      })
    } catch (error) {
      throw new BadRequestException("user not found")
    }
    
    return `user removed`;
  }
}
