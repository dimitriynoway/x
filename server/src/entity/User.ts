/* eslint-disable import/no-cycle */
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,
} from 'typeorm';
import Message from './Message';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  mutted: boolean;

  @Column()
  banned: boolean;

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[]
}
