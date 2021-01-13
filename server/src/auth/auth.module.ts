import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserResolver } from './user/user.resolvers';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserResolver, UserService, AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '240m',
      },
    }),
  ],
})
export class AuthModule {}
