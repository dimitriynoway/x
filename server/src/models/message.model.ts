const colors = ["#e85d04", "#b5e48c", "#507DBC", "#D6CFC7", "#877F7D"];
import mongoose from "mongoose";
import IMessage from "../interfaces/Message";
import Message from "../model/Message"


const createMessage = async (msg: string, id: string, username: string, color: number): Promise<IMessage> => {
	const bgColor = colors[color];
	const message = {
		message: msg,
		userId: id,
		createdAt: Date.now(),
		bgColor: bgColor || 'white',
		type: 'user',
		username
	}
	const newMessage = new Message({
		_id: new mongoose.Types.ObjectId(),
		...message
	})
	const res = await newMessage.save()
	console.log(res)
	// if (res) {
	return res
	// }
	// throw new Error('Error with creating message')
}

const getMessages = async (): Promise<IMessage[]> => {
	const messages = await Message.find().sort({ createdAt: 1 }).limit(20)
	console.log(messages)
	return messages
}

export default {
	createMessage,
	getMessages
}