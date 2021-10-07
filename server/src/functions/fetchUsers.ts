import { getRepository } from 'typeorm';
import User from '../entity/User';

export default async () => {
	const users = await getRepository(User).find({ where: { role: 'user' } });

	if (!users) {
		throw new Error("Error: can't fetch user");
	}

	const filteredUsers = users.map((user) => ({
		id: user.id,
		username: user.username,
		banned: user.banned,
		mutted: user.mutted,
		role: user.role,
	}));
	return filteredUsers;
};
