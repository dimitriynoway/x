import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Message } from "./Message"

@Entity({ name: "users" })
export class User extends BaseEntity {

	@PrimaryGeneratedColumn("uuid")
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

	@OneToMany(type => Message, message => message.user)
	messages?: Message[]
}
