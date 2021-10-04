import { Document } from 'mongoose'

export default interface IUser extends Document {
	email: string,
	password: string,
	username: string,
	role: string[],
	mutted: boolean,
	banned: boolean,
}