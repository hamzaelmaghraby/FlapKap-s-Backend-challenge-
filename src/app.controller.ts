import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './decorator/roles.decorator';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Patch('/deposit/:deposit')
  @Roles('BUYER')
  update(@Param('deposit') deposit: string, @Req() req: Request) {
    return this.appService.update(+deposit, req.user);
  }

  @Patch('/buy/:productId/:amount')
  @Roles('BUYER')
  buy(@Param('productId') productId: string, @Param('amount') amount: string, @Req() req: Request){
    return this.appService.buy(+productId, +amount, req.user);
  }

  @Patch('/reset')
  @Roles('BUYER')
  reset(@Req() req: Request){
    return this.appService.reset(req.user);
  }
}
