import User from '../model/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import checkUniqueUsername from '../functions/checkUniqueUsername'
import createHashedPassword from '../functions/createHashedPassword'
import createRole from '../functions/createRole'
import IUser from '../interfaces/User'
import mongoose from 'mongoose'

const findUserByEmail = (email: string) => {
	return User.findOne({ email })
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

const createToken = async (user: IUser) => {
	const payload = {
		id: user.id,
		username: user.username,
		role: user.role,
	}

	return jwt.sign(payload, process.env.SECRET_KEY as string)
}

const createUser = async (email: string, password: string, username: string) => {
	await checkUniqueUsername(username)
	const hashedPassword = await createHashedPassword(password)
	const role = await createRole()

	const userPayload = {
		email,
		password: hashedPassword,
		username,
		role,
		mutted: false,
		banned: false,
	}

	const createdUser = new User({
		_id: new mongoose.Types.ObjectId(),
		...userPayload
	});
	const savedUser = await createdUser.save();
	if (savedUser) {
		return savedUser
	}
	throw new Error('User not saved')
}

const bannedNotification = (banned: boolean) => {
	if (banned) {
		throw new Error('You are banned')
	}
}
export default {
	findUserByEmail,
	compareUsernames,
	comparePassords,
	createToken,
	createUser,
	bannedNotification
}