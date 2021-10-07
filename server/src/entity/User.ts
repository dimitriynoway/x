/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,
} from 'typeorm';
import Message from './Message';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: '200' })
	username: string;

	@Column({ unique: true, type: 'varchar', length: '200' })
	email: string;

	@Column({ type: 'varchar', length: '200' })
	password: string;

	@Column({ type: 'varchar', length: '200' })
	role: string;

	@Column({ type: 'boolean' })
	mutted: boolean;

	@Column({ type: 'boolean' })
	banned: boolean;

	@OneToMany(() => Message, (message) => message.user)
	messages?: Message[]
}
