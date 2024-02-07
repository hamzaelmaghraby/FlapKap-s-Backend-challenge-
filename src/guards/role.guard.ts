import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Roles } from "src/decorator/roles.decorator";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.get(Roles, context.getHandler())

        if (!requiredRoles) return true;

        const role = context.switchToHttp().getRequest<Request>().user.role;

        if (requiredRoles === role) return true;


        return false;
    }

}