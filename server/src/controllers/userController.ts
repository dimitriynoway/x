import { Request, Response } from "express";
import loginValidation from "../functions/loginValidation"
import IUser from "../interfaces/User";
import userModel from '../models/user.model'

const login = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body

		loginValidation(username, email, password);

		let user = await userModel.findUserByEmail(email)

		if (user && !user.banned) {
			userModel.compareUsernames(user.username, username)
			await userModel.comparePassords(user.password, password)
			const token = await userModel.createToken(user)
			return res.send({ token })
		}

		if (user && user.banned) {
			userModel.bannedNotification(user.banned)
		}

		const createdUser = await userModel.createUser(email, password, username)
		const token = await userModel.createToken(createdUser)
		return res.send({ token })
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).send({ error: err.message })
		}
	}
}
export default {
	login
}