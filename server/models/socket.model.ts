import Message from "../model/Message";
import User from "../model/User"
import users from "../users"
import fetchUsers from '../functions/fetchUsers'
import checkDelay from "../functions/checkDelay"
import { Socket } from "socket.io";

const setCurrentUserStatus = async (id: string, socket: Socket) => {
	const user = await User.findById(id)

	if (!user) {
		throw new Error("User not found")
	}

	if (user.banned) {
		//socket.disconnect(true)
		throw new Error('You are banned')
	}

	//socket.data.userColor = Math.floor(Math.random() * 5);
	socket.data = {
		username: user.username,
		id: user.id,
		role: user.role,
		banned: user.banned,
		mutted: user.mutted,
		userColor: Math.floor(Math.random() * 5)
	}

}

const checkDoubleConnection = (socket: Socket) => {
	const cloneIndex = users.findIndex(({ client }) => client.id == socket.data.id)

	if (cloneIndex != -1) {
		users[cloneIndex].socket.disconnect(true);
		users.splice(cloneIndex, 1)
	}

	const params = {
		id: socket.data.id,
		userColor: socket.data.userColor,
		username: socket.data.username
	}
	users.push({ client: params, socket: socket })
}

const banUser = async (bool: boolean, id: string) => {
	const user = await User.findByIdAndUpdate(id, { banned: bool }, { new: true })
	if (user) {
		return user
	}
	throw new Error("Error: can't ban the user")
}

const getUsers = async (role: string[]) => {
	const users = await fetchUsers()
	return users
}

const muteUser = async (bool: boolean, id: string) => {
	const user = await User.findByIdAndUpdate(id, { mutted: bool }, { new: true })
	if (user) {
		return user
	}
	throw new Error("Error: can't mute the user")
}

const isUserMutted = async (id: string) => {
	const user = await User.findById(id)
	if (user) {
		return user.mutted
	}
}

const checkMessageDelay = async (id: string) => {
	const lastMessage = await Message.findOne({ userId: id }).sort({ createdAt: -1 })
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
	isUserMutted,
	checkMessageDelay
}