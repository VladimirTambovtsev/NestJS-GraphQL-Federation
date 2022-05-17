import { VerificationEntity } from './../verification/verification.entity';
import { RolesGuard } from './guards/roles.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/users/user';

import { AuthService } from './auth.service';
import { AuthToken } from './dtos/outputs/token.output';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Roles } from './roles.decorator';
import { Role } from 'src/users/user.entity';
import { LoginInput } from './dtos/inputs/login.input';
import { ChangePasswordInput } from './dtos/inputs/change-password.input';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Courier)
  @Get('privateRole')
  privateRole() {
    return 'Response for courier here';
  }

  @ApiOperation({ summary: 'Confirm email to activate user account' })
  @ApiResponse({ status: 200, type: VerificationEntity })
  @Get('/confirm')
  confirm(@Query(new ValidationPipe()) query: { token: string }) {
    return this.authService.confirmAccountByEmail(query.token);
  }

  @ApiOperation({ summary: 'Login user with email and password' })
  @ApiResponse({ status: 200, type: AuthToken })
  @Post('login')
  // @UseGuards(JwtAuthGuard)
  login(@Body() dto: LoginInput) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Register new user with email and password' })
  @ApiResponse({ status: 200, type: AuthToken })
  @Post('registration')
  registration(@Body() dto: LoginInput) {
    return this.authService.registration(dto as User);
  }

  @ApiOperation({ summary: 'Forgot password, send link to email' })
  @ApiResponse({ status: 200, type: AuthToken })
  @Post('/forget-password')
  forgetPassword(@Body(new ValidationPipe()) email: string) {
    return this.authService.forgetPassword(email);
  }

  @ApiOperation({
    summary: 'Forgot password, change password by link from email',
  })
  @ApiResponse({ status: 200, type: VerificationEntity })
  @Post('/change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(@Body(new ValidationPipe()) dto: ChangePasswordInput) {
    return this.authService.changePassword({
      userId: dto.userId,
      newPassword: dto.newPassword,
    });
  }
}
