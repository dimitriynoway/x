import { Request, Response } from "express";
import loginValidation from "../functions/loginValidation"
import * as authService from "../services/loginUser";

const login = async (req: Request, res: Response) => {

	try {
		const { username, email, password } = req.body
		loginValidation(username, email, password);
		let user = await authService.findUserByEmail(email)

		if (user && !user.banned) {
			authService.compareUsernames(user.username, username)
			await authService.comparePassords(user.password, password)
			const token = await authService.createToken(user.id, user.username, user.role)

			return res.send({ token })
		}

		if (user && user.banned) {
			authService.bannedNotification(user.banned)
		}

		const createdUser = await authService.createUser(username, email, password);
		const token = await authService.createToken(createdUser.id, createdUser.username, createdUser.role[0])

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