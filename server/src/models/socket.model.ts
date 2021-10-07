import { Socket } from 'socket.io';
import { getRepository } from 'typeorm';
import users from '../users';
import fetchUsers from '../functions/fetchUsers';
import checkDelay from '../functions/checkDelay';
import User from '../entity/User';
import Message from '../entity/Message';

export const setCurrentUserStatus = (findedUser: User, socket: Socket) => {
	socket.data = {
		username: findedUser.username,
		id: findedUser.id,
		role: findedUser.role,
		banned: findedUser.banned,
		mutted: findedUser.mutted,
		userColor: Math.floor(Math.random() * 5),
	};
};

export const checkUserInDB = (id: number) => {
	const userRepo = getRepository(User);
	return userRepo.findOne({ where: { id } });
};

export const checkDoubleConnection = (socket: Socket): void => {
	const cloneIndex = users.findIndex(({ client }) => client.id === socket.data.id);

	if (cloneIndex !== -1) {
		users[cloneIndex].socket.disconnect(true);
		users.splice(cloneIndex, 1);
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
		mutted: socket.data.mutted,
	};
	users.push({ client: params, socket });
};

export const banUser = async (bool: boolean, id: number) => {
	const userRepo = getRepository(User);
	const findedUser = await userRepo.findOne({ id });
	const user = await userRepo.save({
		id: findedUser.id,
		...findedUser,
		banned: bool,
	});

	if (user) {
		return user;
	}

	throw new Error("Error: can't ban the user");
};

export const getUsers = () => {
	const allUsers = fetchUsers();
	return allUsers;
};

export const muteUser = async (bool: boolean, id: number) => {
	const userRepo = getRepository(User);
	const user = await userRepo.findOne({ id });
	const updatedUser = userRepo.save({
		id: user.id,
		...user,
		mutted: bool,
	});

	if (updatedUser) {
		return updatedUser;
	}

	throw new Error("Error: can't mute the user");
};

export const checkMessageDelay = async (id: string) => {
	const MessageRepo = getRepository(Message);
	const lastMessage = await MessageRepo.findOne({
		where: { user: { id } },
		order: {
			id: 'DESC',
		},
	});

	if (lastMessage) {
		return checkDelay(lastMessage.createdAt);
	}

	return 0;
};
