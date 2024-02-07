import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) { }

  async login(loginObject: loginDTO) {
    // get password
    // const isMatch = await bcrypt.compare(loginObject.password, hashedPassword);
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          username: loginObject.username
        },
      })
      const isMatch = await bcrypt.compare(loginObject.password, user.password);
      if(isMatch){
        const payload = { username: user.username, id:user.id, role: user.role};
        const token = await this.jwtService.signAsync(payload);
        return token;
      }
      else
        throw new UnauthorizedException('incorect username or password');
    } catch (error) {
      throw new NotFoundException('incorect username or password');
    }
  }
}
