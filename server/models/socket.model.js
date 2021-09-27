import Message from "../model/Message";
import User from "../model/User"
import users from "../users"
import fetchUsers from '../functions/fetchUsers'
import checkDelay from "../functions/checkDelay"

const setCurrentUserStatus = async (id, socket) => {
	const user = await User.findById(id)

	if (!user) {
		throw new Error("User not found")
	}

	if (user.banned) {
		//socket.disconnect(true)
		throw new Error('You are banned')
	}

	socket.userColor = Math.floor(Math.random() * 5);
	socket.decoded = {
		username: user.username,
		id: user.id,
		role: user.role,
		banned: user.banned,
		mutted: user.mutted
	}
}

const checkDoubleConnection = (socket) => {
	const cloneIndex = users.findIndex(({ client }) => client.id == socket.decoded.id)

	if (cloneIndex != -1) {
		users[cloneIndex].socket.disconnect(true);
		users.splice(cloneIndex, 1)
	}

	const params = {
		id: socket.decoded.id,
		userColor: socket.userColor,
		username: socket.decoded.username
	}
	users.push({ client: params, socket: socket })
}

const banUser = async (bool, id) => {
	const user = await User.findByIdAndUpdate(id, { banned: bool }, { new: true })
	if (user) {
		return user
	}
	throw new Error("Error: can't ban the user")
}

const getUsers = async (role) => {
	const users = await fetchUsers()
	return users
}

const muteUser = async (bool, id) => {
	const user = await User.findByIdAndUpdate(id, { mutted: bool }, { new: true })
	if (user) {
		return user
	}
	throw new Error("Error: can't mute the user")
}

const isUserMutted = async (id) => {
	const user = await User.findById(id)
	return user.mutted
}

const checkMessageDelay = async (id) => {
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