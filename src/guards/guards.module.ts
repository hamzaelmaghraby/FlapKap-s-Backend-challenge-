import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { RoleGuard } from './role.guard';

@Module({
    providers: [AuthGuard, RoleGuard, AuthService],
    exports: [AuthGuard],
})
export class GuardsModule { }
