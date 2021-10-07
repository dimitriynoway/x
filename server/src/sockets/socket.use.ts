import jwt, { JwtPayload } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import {
	setCurrentUserStatus,
	checkDoubleConnection,
	checkUserInDB,
} from '../models/socket.model';

interface Next {
	// eslint-disable-next-line no-unused-vars
	(err?: ExtendedError | Error | undefined): void
}

const socketUse = async (socket: Socket, next: Next) => {
	try {
		if (!socket.handshake.auth && !socket.handshake.auth.token){
			socket.emit('error', 'Token not passed');
			socket.disconnect()
		}
		
		const decoded = <JwtPayload>jwt.verify(
			socket.handshake.auth.token,
			process.env.SECRET_KEY as string,
			);
			// decoded = {id, username, role}
			// take from db actual data and check if user is banned
		const decodedId = decoded.id;
		const findedUser = await checkUserInDB(decodedId);

		if (!findedUser) {
			throw new Error('User not found');
		}
		if (findedUser.banned) {
				// socket.disconnect(true)
			throw new Error('You are banned');
		}
		setCurrentUserStatus(findedUser, socket);
		checkDoubleConnection(socket);
		next();
		
	} catch (err) {
		socket.emit('error', err.message);
		socket.disconnect()
		// next(err);
	}
};

export default socketUse;
