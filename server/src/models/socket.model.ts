import users from "../users"
import fetchUsers from '../functions/fetchUsers'
import checkDelay from "../functions/checkDelay"
import { Socket } from "socket.io";
import { getRepository } from "typeorm";
import { User } from '../entity/User'
import { Message } from '../entity/Message'

const setCurrentUserStatus = async (id: number, socket: Socket) => {

	const userRepo = getRepository(User)
	const findedUser = await userRepo.findOne({ where: { id: id } })

	if (!findedUser) {
		throw new Error("User not found")
	}

	if (findedUser.banned) {
		//socket.disconnect(true)
		throw new Error('You are banned')
	}

	socket.data = {
		username: findedUser.username,
		id: findedUser.id,
		role: findedUser.role,
		banned: findedUser.banned,
		mutted: findedUser.mutted,
		userColor: Math.floor(Math.random() * 5)
	}
}

const checkDoubleConnection = (socket: Socket) => {

	const cloneIndex = users.findIndex(({ client }) => client.id == socket.data.id)

	if (cloneIndex != -1) {
		users[cloneIndex].socket.disconnect(true);
		users.splice(cloneIndex, 1)
	}

	const params: {
		id: number,
		userColor: number,
		username: string,
		banned: boolean,
		mutted: boolean
	} = {
		id: socket.data.id,
		userColor: socket.data.userColor,
		username: socket.data.username,
		banned: socket.data.banned,
		mutted: socket.data.mutted
	}
	users.push({ client: params, socket: socket })
}

const banUser = async (bool: boolean, id: number) => {

	const userRepo = getRepository(User)
	const findedUser = await userRepo.findOne({ id });
	const user = await userRepo.save({
		id: findedUser.id,
		...findedUser,
		banned: bool
	})

	if (user) {
		return user
	}

	throw new Error("Error: can't ban the user")
}

const getUsers = () => {
	const users = fetchUsers()
	return users
}

const muteUser = async (bool: boolean, id: number) => {

	const userRepo = getRepository(User)
	const user = await userRepo.findOne({ id })
	const updatedUser = userRepo.save({
		id: user.id,
		...user,
		mutted: bool
	})

	if (updatedUser) {
		return updatedUser
	}

	throw new Error("Error: can't mute the user")
}


const checkMessageDelay = async (id: string) => {

	const MessageRepo = getRepository(Message)
	const lastMessage = await MessageRepo.findOne({
		where: { user: { id } },
		order: {
			id: 'DESC'
		}
	})

	if (lastMessage) {
		return checkDelay(lastMessage.createdAt)
	}

	return 0
}

export default {
	setCurrentUserStatus,
	checkDoubleConnection,
	banUser,
	getUsers,
	muteUser,
	checkMessageDelay
}