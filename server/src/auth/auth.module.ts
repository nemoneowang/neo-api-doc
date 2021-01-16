import { RoleService } from './user/role.service';
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
import { Role } from './model/role.entity';

@Module({
  controllers: [UserController],
  providers: [UserResolver, UserService, AuthService, JwtStrategy, RoleService],
  exports: [AuthService, JwtStrategy, RoleService],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '240m',
      },
    }),
  ],
})
export class AuthModule {}
