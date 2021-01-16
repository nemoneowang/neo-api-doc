import { User } from './../model/user.entity';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { newUserInput } from '../dto/new-user.input';
import * as bcrypt from 'bcrypt';
import { Role } from '../model/role.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  getUserById(userId: number): Promise<User> {
    const user = this.userRepository.findOne(userId, { relations: ['roleList'] });

    return user;
  }

  async create(user: newUserInput): Promise<User> {
    const password = await bcrypt.hashSync(user.password, 10);
    console.log(password);
    user.password = password;
    return this.userRepository.save(user);
  }

  deleteUser(user: User): Promise<User> {
    return this.userRepository.remove(user);
  }
  updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username: username });
  }
}
