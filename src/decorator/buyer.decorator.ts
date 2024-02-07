import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Buyer = (): CustomDecorator<string> => SetMetadata('isBuyer', true);