import mongoose, { Schema } from 'mongoose'
import IMessage from '../interfaces/Message';

const messageSchema: Schema = new Schema({
	userId: { type: String, required: true },
	createdAt: { type: Date, required: true },
	message: { type: String, required: true, maxLength: 200 },
	bgColor: { type: String, required: true },
	type: { type: String, required: true },
	username: { type: String, required: true }
}, {
	timestamps: true
});
export default mongoose.model<IMessage>('Message', messageSchema);
