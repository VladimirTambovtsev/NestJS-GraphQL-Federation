import { ChangePasswordInput } from './dtos/inputs/change-password.input';
import { VerificationService } from './../verification/verification.service';
import * as fs from 'fs';
import * as path from 'path';
import { SignOptions } from 'jsonwebtoken';
import { LoginInput } from './dtos/inputs/login.input';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { addDays, isBefore, isEqual } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly verificationService: VerificationService,
  ) {}

  async login(userDto: LoginInput) {
    const user = await this.validateUser(userDto.email, userDto.password);
    return this.generateToken(user);
  }

  async registration(user: User) {
    const candidate = await this.usersService.getUserByEmail(user.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(user.password, 5);
    await this.usersService.createUser({
      ...user,
      password: hashPassword,
    });
    const { token } = await this.generateToken(user);
    await this.sendEmailConfirmation(user);
    return { token };
  }

  private async sendEmailConfirmation(user: User) {
    const expiresIn = 60 * 60 * 24; // 24 hours
    const { token } = await this.generateToken(user, { expiresIn });

    const expireAt = addDays(new Date(), 1).toISOString();
    console.log('expireAt: ', expireAt);

    await this.verificationService.create({
      verificationToken: token,
      expiresIn: expireAt,
    });

    const clientAppUrl = this.configService.get<string>('FRONTEND_APP_URL');
    const confirmLink = `${clientAppUrl}/auth/confirm?token=${token}`;

    const htmlTemplate = fs.readFileSync(
      path.join(__dirname, '../mail/templates/email-confirmation.html'),
      'utf8',
    );

    const recipientVars = {
      [user.email]: {
        preHeader: 'Creating new account',
        buttonText: 'Press here',
        url: confirmLink,
      },
    };
    await this.mailService.send({
      from: this.configService.get<string>('MAILGUN_FROM'),
      to: user.email,
      subject: 'Confirm account',
      html: htmlTemplate,
      recipientVars,
    });
  }

  async confirmAccountByEmail(token: string) {
    const verification =
      await this.verificationService.findOneByVerificationToken(token);

    if (!verification) {
      throw new BadRequestException('Token not found for this verification');
    }
    if (verification.isVerified) {
      throw new BadRequestException('Account already verified');
    }
    if (
      isBefore(new Date(verification.expiresIn), new Date()) ||
      isEqual(new Date(verification.expiresIn), new Date())
    ) {
      throw new BadRequestException('Verification is expired');
    }

    await this.verificationService.setVerified(verification);
    return { ...verification, isVerified: true };
  }

  async forgetPassword(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found with this email');
    }
    // TODO: check that user has verified account

    const expiresIn = 60 * 60 * 24; // 24 hours
    const { token } = await this.generateToken(user, { expiresIn });
    const clientAppUrl = this.configService.get<string>('FRONTEND_APP_URL');
    const confirmLink = `${clientAppUrl}/auth/forget-password?token=${token}`;

    const htmlTemplate = fs.readFileSync(
      path.join(__dirname, '../mail/templates/email-confirmation.html'),
      'utf8',
    );

    const recipientVars = {
      [user.email]: {
        preHeader: 'Reset Password',
        buttonText: 'Press here',
        url: confirmLink,
      },
    };
    await this.mailService.send({
      from: this.configService.get<string>('MAILGUN_FROM'),
      to: user.email,
      subject: 'Reset Password',
      html: htmlTemplate,
      recipientVars,
    });
  }

  async changePassword({ userId, newPassword }: ChangePasswordInput) {
    try {
      const user = await this.usersService.getUserById(userId);
      if (!user) {
        throw new BadRequestException('User not found with this user id');
      }
      const newHashPassword = await bcrypt.hash(newPassword, 5);
      await this.usersService.updateUserPassword(userId, newHashPassword);
    } catch (error) {
      throw new HttpException(
        `Error updating password: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateToken(user: User, options?: SignOptions) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload, options),
    };
  }

  async validateUser(email: string, passwordParam: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorret email or password.',
      });
    }

    const passwordEquals = await bcrypt.compare(passwordParam, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorret email or password.',
    });
  }
}
