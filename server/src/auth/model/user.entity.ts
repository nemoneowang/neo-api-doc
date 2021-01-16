import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany((type) => Role, (role) => role.userList)
  @JoinTable({
    name: 'user_role_mapping',
  })
  roleList: Role[];
}
