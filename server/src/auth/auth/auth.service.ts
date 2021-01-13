import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private readonly jwtService: JwtService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return {
        ...result,
        token: this.jwtService.sign({
          username: user.username,
          userId: user.userId,
        }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
