import { IsString } from "class-validator";

export class loginDTO {
    @IsString()
    username: string;
    @IsString()
    password: string;
}