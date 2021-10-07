import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../entity/User';
import createHashedPassword from '../functions/createHashedPassword';

export const findUserByEmail = (email: string) => {
	const userRepo = getRepository(User);
	return userRepo.findOne({ email });
};

export const createUser = async (
	username: string,
	email: string,
	password: string,
) => {
	try {
		const userRepo = getRepository(User);
		const notUniqeUsername = await userRepo.findOne(username);

		if (notUniqeUsername) {
			throw new Error("You can't use this username");
		}

		const hashedPassword = await createHashedPassword(password);
		const countOfUsers = await userRepo.count();
		const role: string = countOfUsers > 0 ? 'user' : 'admin';

		const user = userRepo.create({
			username,
			email,
			password: hashedPassword,
			role,
			mutted: false,
			banned: false,
		});
		const createdUser = await userRepo.save(user);

		if (createdUser) {
			return createdUser;
		}

		throw new Error('sql');
	} catch (err) {
		throw new Error('sql');
	}
};

export const createToken = async (id: number, username: string, role: string) => {
	const payload = {
		id,
		username,
		role,
	};

	return jwt.sign(payload, process.env.SECRET_KEY as string);
};

export const comparePassords = async (password: string, enteredPassword: string) => {
	const matchPasswords = await bcrypt.compare(
		enteredPassword,
		password,
	);
	return matchPasswords
};

