import socketModel from '../models/socket.model'
import messageModel from '../models/message.model'
import users from '../users'

const socketOn = (io) => async (socket) => {
	try {
		const messages = await messageModel.getMessages()

		if (socket.decoded.role.includes('admin')) {
			socket.emit('admin')
			const allUsers = await socketModel.getUsers(socket.decoded.role)
			socket.emit('getUsersFromServer', allUsers)
			socket.on('ban', async ({ ban, id }) => {
				const updatedUser = await socketModel.banUser(ban, id)

				if (ban) {
					const suspect = users.find(({ client }) => {
						return client.id == id;
					});

					if (suspect) {
						suspect.socket.emit('dissconnect type', { type: "banned" })
						suspect.socket.disconnect(true);
					}

				}

				socket.emit('getUserFromBan', updatedUser)

			})

			socket.on('mute', async ({ mute, id }) => {
				const updatedUser = await socketModel.muteUser(mute, id)
				const muttedUserIndex = users.findIndex(({ client }) => client.id === id)

				if (muttedUserIndex != -1) {

					// if (mute) {
					users[muttedUserIndex].socket.decoded.mutted = mute
					// }
					// 
					// if (!mute) {
					// users[muttedUserIndex].socket.decoded.mutted = false
					// }

				}

				socket.emit('getUserFromMute', updatedUser)
			})
		}

		socket.emit('you connected', {
			clients: users.map(({ client }) => client),
			username: socket.decoded.username,
			messages
		})

		socket.broadcast.emit('new user connection', {
			client: {
				id: socket.decoded.id,
				userColor: socket.userColor,
				username: socket.decoded.username
			},
		})

		socket.on('message', async ({ msg }) => {
			const isMutted = users.find(({ client }) => client.id == socket.decoded.id).socket.decoded.mutted

			if (isMutted) {
				return socket.emit('mutted')
			}

			const time = await socketModel.checkMessageDelay(socket.decoded.id)

			if (time > 0) {
				return socket.emit('delay', time)
			}

			try {
				const res = await messageModel.createMessage(msg, socket.decoded.id, socket.decoded.username, socket.userColor)
			} catch (e) {

			}

			io.emit('message', {
				message: res.message,
				userColor: socket.userColor,
				username: socket.decoded.username,
				message_id: res._id
			})
		});

		socket.on('disconnect', async () => {
			const index = users.findIndex(({ client }) => client.id == socket.decoded.id)
			if (index != -1) {
				const disconnectedUser = users[index].client
				users.splice(index, 1)
				io.emit('user disconnect', ({ disconnectedUser }));
			}
		});
	} catch (err) {
		socket.emit('error', err.message)
	}
};
export default socketOn
