import jwt, { JwtPayload } from 'jsonwebtoken'
import socketModel from '../models/socket.model'
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

interface Next {
	(err?: ExtendedError | undefined): void
}

const socketUse = (socket: Socket, next: Next) => {
	try {
		if (socket.handshake.auth && socket.handshake.auth.token) {
			const decoded = <JwtPayload>jwt.verify(
				socket.handshake.auth.token,
				process.env.SECRET_KEY as string
			);
			//decoded = {id, username, role}
			//take from db actual data and check if user is banned
			const decodedId = decoded.id
			socketModel.setCurrentUserStatus(decodedId, socket).then(() => {
				socketModel.checkDoubleConnection(socket)

				return next();
			}).catch((err) => {

				if (err instanceof Error) {
					next(new Error(err.message));
				}

			})
		}
	} catch (error) {
		if (error instanceof Error) {
			next(new Error(error.message));
		}
	}
};

export default socketUse

