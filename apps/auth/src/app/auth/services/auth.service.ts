import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/services';
import { SignInDto } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SignUpDto } from '../dtos';
import { ENV } from 'src/config/env';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(ENV.MS.NOTIFICATION)
    private readonly notificationService: ClientProxy,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{
    token: string;
    user: User;
  }> {
    const user = await this.userService.signIn(signInDto);
    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
      name: user.fullName,
    });

    delete user.password;
    return {
      token,
      user,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<{
    token: string;
    user: User;
  }> {
    this.notificationService.emit('email.create', {
      email: signUpDto.email,
      subject: 'Welcome to Microservice Auth API',
      template: 'welcome',
    });
    const user = await this.userService.signUp(signUpDto);
    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
      name: user.fullName,
    });
    return {
      token,
      user,
    };
  }

  async profile(user: User): Promise<User> {
    return this.userService.detail(user.id);
  }
}
