import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Request } from 'express';
import { Public } from 'src/decorator/public.decorator';
import { Buyer } from 'src/decorator/buyer.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  

  @Get()
  findOne(@Req() req: Request) {
    return this.usersService.findOne(req.user);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    return this.usersService.update(updateUserDto, req.user);
  }

  @Delete()
  remove(@Req() req: Request) {
    return this.usersService.remove(req.user);
  }
}
