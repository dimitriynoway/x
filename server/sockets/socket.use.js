import jwt from 'jsonwebtoken'
import socketModel from '../models/socket.model'

const socketUse = async (socket, next) => {
	try {
		if (socket.handshake.auth && socket.handshake.auth.token) {
			const decoded = jwt.verify(
				socket.handshake.auth.token,
				process.env.SECRET_KEY
			);
			//decoded = {id, username, role}
			//take from db actual data and check if user is banned
			await socketModel.setCurrentUserStatus(decoded.id, socket)
			//disconnect 'clone' user
			socketModel.checkDoubleConnection(socket)
			return next();
		}
	} catch (error) {
		//disconnect without message or go to socket.on but with message
		next(new Error(error.message));
	}
};

export default socketUse

