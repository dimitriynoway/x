import mongoose, { Schema } from 'mongoose'
import IUser from '../interfaces/User';

const userSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String },
	username: { type: String, required: true },
	role: [{ type: String, required: true }],
	mutted: { type: Boolean, required: true },
	banned: { type: Boolean, required: true },
});
export default mongoose.model<IUser>('User', userSchema);
