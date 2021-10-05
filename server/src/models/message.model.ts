const colors = ["#e85d04", "#b5e48c", "#507DBC", "#D6CFC7", "#877F7D"];
import { getRepository } from "typeorm";
import { Message as Messagesql } from "../entity/Message"

const createMessage = (msg: string, id: number, username: string, color: number) => {

	const bgColor = colors[color];
	const today = new Date().toString()
	const message = {
		message: msg,
		user: { id: id },
		createdAt: today,
		bgColor: bgColor || 'white',
		type: 'user',
		username
	}
	const messageRepo = getRepository(Messagesql)
	const res = messageRepo.save({
		...message
	})

	return res
}

const getMessages = () => {

	const messageRepo = getRepository(Messagesql)
	const messages = messageRepo.find()

	return messages
}

export default {
	createMessage,
	getMessages
}