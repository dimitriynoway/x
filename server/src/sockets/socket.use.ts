import jwt, { JwtPayload } from 'jsonwebtoken'
import socketModel from '../models/socket.model'
import { NextFunction } from 'express'
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
			console.log(1)
			const decodedId = decoded.id
			console.log(2)
			console.log(decodedId)

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
		//disconnect without message or go to socket.on but with message
		console.log('we are here')
		if (error instanceof Error) {
			next(new Error(error.message));
		}
	}
};

export default socketUse

