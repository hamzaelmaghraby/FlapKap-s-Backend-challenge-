import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext) {

        const isPublicRoute = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );
        if (isPublicRoute) return true;

        const authorizationHeader = context.switchToHttp().getRequest<Request>().headers.authorization;

        if (!authorizationHeader) {
            throw new BadRequestException('Authorization header is required');
        }
        
        const token = authorizationHeader.split(' ')[1];

        // check if token is valid 
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            );

            context.switchToHttp().getRequest<Request>().user = payload;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }





        return true;
    }

}