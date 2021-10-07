import { Socket } from 'socket.io';
import socketModel from '../models/socket.model';
import messageModel from '../models/message.model';
import users from '../users';

const socketOn = (io: any) => async (socket: Socket) => {
  try {
    const messages = await messageModel.getMessages();

    if (socket.data.role === 'admin') {
      socket.emit('admin');
      const allUsers = await socketModel.getUsers();
      socket.emit('getUsersFromServer', allUsers);
      socket.on('ban', async ({ ban, id }: { ban: boolean, id: number }) => {
        const updatedUser = await socketModel.banUser(ban, id);

        if (ban) {
          const suspect = users.find(({ client }) => client.id === id);

          if (suspect) {
            suspect.socket.emit('dissconnect type', { type: 'banned' });
            suspect.socket.disconnect(true);
          }
        }

        socket.emit('getUserFromBan', updatedUser);
      });

      socket.on('mute', async ({ mute, id }: { mute: boolean, id: number }) => {
        const updatedUser = await socketModel.muteUser(mute, id);
        const muttedUserIndex = users.findIndex(({ client }) => client.id === id);

        if (muttedUserIndex !== -1) {
          users[muttedUserIndex].socket.data.mutted = mute;
        }

        socket.emit('getUserFromMute', updatedUser);
      });
    }

    socket.emit('you connected', {
      clients: users.map(({ client }) => client),
      username: socket.data.username,
      messages,
    });

    socket.broadcast.emit('new user connection', {
      client: {
        id: socket.data.id,
        userColor: socket.data.userColor,
        username: socket.data.username,
        banned: socket.data.banned,
        mutted: socket.data.mutted,
      },
    });

    socket.on('message', async ({ msg }: { msg: string }) => {
      let isMutted: boolean;
      const user = users.find(({ client }) => client?.id === socket.data.id);

      if (user) {
        isMutted = user.socket.data.mutted;
      }

      if (isMutted) {
        socket.emit('mutted');
        return;
      }

      const time = await socketModel.checkMessageDelay(socket.data.id);

      if (time > 0) {
        socket.emit('delay', time);
        return;
      }

      const res = await messageModel
        .createMessage(msg, socket.data.id, socket.data.username, socket.data.userColor);

      io.emit('message', {
        message: res.message,
        userColor: socket.data.userColor,
        username: socket.data.username,
        messageId: res.user.id,
      });
    });

    socket.on('disconnect', async () => {
      const index = users.findIndex(({ client }) => client.id === socket.data.id);
      if (index !== -1) {
        const disconnectedUser = users[index].client;
        users.splice(index, 1);
        io.emit('user disconnect', ({ disconnectedUser }));
      }
    });
  } catch (err) {
    if (err instanceof Error) {
      socket.emit('error', err.message);
    }
  }
};
export default socketOn;
