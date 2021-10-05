import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import createHashedPassword from '../functions/createHashedPassword';

const findUserByEmail = (email: string) => {
	const userRepo = getRepository(User)
	return userRepo.findOne({ email })
}

const createUser = async (
	username: string,
	email: string,
	password: string,
) => {

	try {
		const userRepo = getRepository(User)
		const notUniqeUsername = await userRepo.findOne(username)

		if (notUniqeUsername) {
			throw new Error("You can't use this username")
		}

		const hashedPassword = await createHashedPassword(password)
		const countOfUsers = await userRepo.count()
		const role: string = countOfUsers > 0 ? 'user' : 'admin';

		const user = userRepo.create({
			username,
			email,
			password: hashedPassword,
			role,
			mutted: false,
			banned: false
		})
		const createdUser = await userRepo.save(user)

		if (createdUser) {
			return createdUser;
		}

		throw new Error('sql')
	} catch (err) {
		console.log(err)
		throw new Error('sql')
	}

}

const createToken = async (id: number, username: string, role: string) => {
	const payload = {
		id,
		username,
		role,
	}

	return jwt.sign(payload, process.env.SECRET_KEY as string)
}

const compareUsernames = (username1: string, username2: string) => {
	if (username1 !== username2) {
		throw new Error("Incorrect username")
	}
}

const comparePassords = async (password: string, enteredPassword: string) => {
	const matchPasswords = await bcrypt.compare(
		enteredPassword,
		password,
	);
	if (!matchPasswords) {
		throw new Error('Passwords do not match');
	}
}

const bannedNotification = (banned: boolean) => {
	if (banned) {
		throw new Error('You are banned')
	}
}

export {
	createUser,
	findUserByEmail,
	createToken,
	compareUsernames,
	comparePassords,
	bannedNotification
}