import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import jwt from 'jsonwebtoken';
const createUser = async (
	username: string,
	email: string,
	password: string,
) => {
	try {
		const userRepo = getRepository(User)
		//!ROLE FUNc
		const role = 'user'
		const user = userRepo.create({
			username,
			email,
			password,
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

const findUserByEmail = (email: string) => {
	const userRepo = getRepository(User)
	return userRepo.findOne({ email })
}

const createToken = async (id: string, username: string, role: string) => {
	const payload = {
		id,
		username,
		role,
	}

	return jwt.sign(payload, process.env.SECRET_KEY as string)
}

export {
	createUser,
	findUserByEmail,
	createToken
}