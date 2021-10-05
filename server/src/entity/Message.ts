import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "messages" })
export class Message extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	createdAt: string

	@Column({ length: 200 })
	message: string

	@Column()
	bgColor: string;

	@Column()
	type: string;

	@Column()
	username: string;

	//userid
	@ManyToOne(type => User, user => user.messages)
	user: User
}
