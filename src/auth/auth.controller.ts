import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/auth.dto';
import {Public } from 'src/decorator/public.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @Public()
  async login(@Body() loginObject: loginDTO) {
    const response = await this.authService.login(loginObject);
    return response
  }
}
