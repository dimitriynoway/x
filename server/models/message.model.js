const colors = ["#e85d04", "#b5e48c", "#507DBC", "#D6CFC7", "#877F7D"];
const Message = require("../model/Message")

const createMessage = async (msg, id, username, color) => {
	const message = {
		message: msg,
		userId: id,
		createdAt: Date.now().toString(),
		bgColor: colors[color] || 'white',
		type: 'user',
		username
	}
	const newMessage = new Message(message)
	const res = await newMessage.save()
	if (res) {
		return res
	}
	throw new Error('Error with creating message')
}

const getMessages = async () => {
	return await Message.find().sort({ createdAt: 1 }).limit(20)
}

export default {
	createMessage,
	getMessages
}