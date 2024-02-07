import { IsEnum, IsInt, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    productName: string;
    @IsInt()
    cost: number;
    @IsInt()
    amountAvailable: number;
    sellerId: number;
}
