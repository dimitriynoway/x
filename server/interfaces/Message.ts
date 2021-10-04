import { Document } from 'mongoose'

export default interface IMessage extends Document {
	userId: string,
	createdAt: Date,
	message: string,
	bgColor: string,
	type: string,
	username: string
}