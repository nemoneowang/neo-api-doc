import { User } from './../model/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../model/role.entity';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(User)
    private roleRepository: Repository<Role>,
  ) {}
  getRoleListByUserId(userId: number): Promise<Role> {
    const Role = this.roleRepository.findOne(userId, {
      relations: ['role'],
    });
    return Role;
  }

  // async create(user: newUserInput): Promise<User> {
  //   const password = await bcrypt.hashSync(user.password, 10);
  //   console.log(password);
  //   user.password = password;
  //   return this.userRepository.save(user);
  // }

  // deleteUser(user: User): Promise<User> {
  //   return this.userRepository.remove(user);
  // }
  // updateUser(user: User): Promise<User> {
  //   return this.userRepository.save(user);
  // }
  // getUserByUsername(username: string): Promise<User> {
  //   return this.userRepository.findOne({ username: username });
  // }
}
