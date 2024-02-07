import { Roles } from "@prisma/client";
import { IsEnum, IsInt, IsNumber, IsString, isEnum, isString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsInt()
    deposit?: number;
    @IsEnum(Roles)
    role: Roles;
}
