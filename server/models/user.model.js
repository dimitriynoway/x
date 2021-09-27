import User from '../model/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import checkUniqueUsername from '../functions/checkUniqueUsername'
import createHashedPassword from '../functions/createHashedPassword'
import createRole from '../functions/createRole'

const findUserByEmail = async (email) => {
	return await User.findOne({ email })
}

const compareUsernames = (username1, username2) => {
	if (username1 !== username2) {
		throw new Error("Incorrect username")
	}
}

const comparePassords = async (password, enteredPassword) => {
	const matchPasswords = await bcrypt.compare(
		enteredPassword,
		password,
	);
	if (!matchPasswords) {
		throw new Error('Passwords do not match');
	}
}

const createToken = async (user) => {
	const payload = {
		id: user.id,
		username: user.username,
		role: user.role,
	}

	return jwt.sign(payload, process.env.SECRET_KEY)
}

const createUser = async (email, password, username) => {
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

	const createdUser = new User(userPayload);
	const savedUser = await createdUser.save();
	return savedUser ? savedUser : new Error('User not saved')
}

const bannedNotification = (banned) => {
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