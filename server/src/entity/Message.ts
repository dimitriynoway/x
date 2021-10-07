/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,
} from 'typeorm';
import User from './User';

@Entity({ name: 'messages' })
export default class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: '200' })
	createdAt: string

	@Column({ length: 200 })
	message: string

	@Column({ type: 'varchar', length: '200' })
	bgColor: string;

	@Column({ type: 'varchar', length: '200' })
	type: string;

	@Column({ type: 'varchar', length: '200' })
	username: string;

	// userid
	@ManyToOne(() => User, (user) => user.messages)
	user: User
}
