import jwt, { JwtPayload } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import socketModel from '../models/socket.model';

interface Next {
  // eslint-disable-next-line no-unused-vars
  (err?: ExtendedError | Error | undefined): void
}

const socketUse = async (socket: Socket, next: Next) => {
  try {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      const decoded = <JwtPayload>jwt.verify(
        socket.handshake.auth.token,
        process.env.SECRET_KEY as string,
      );
      // decoded = {id, username, role}
      // take from db actual data and check if user is banned
      const decodedId = decoded.id;
      const findedUser = await socketModel.checkUserInDB(decodedId);

      if (!findedUser) {
        throw new Error('User not found');
      }
      if (findedUser.banned) {
        // socket.disconnect(true)
        throw new Error('You are banned');
      }
      socketModel.setCurrentUserStatus(findedUser, socket);
      socketModel.checkDoubleConnection(socket);
      next();
    }
  } catch (err) {
    next(new Error(err));
  }
};

export default socketUse;
