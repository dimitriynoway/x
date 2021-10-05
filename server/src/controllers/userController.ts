import { Request, Response } from "express";
import loginValidation from "../functions/loginValidation"
import IUser from "../interfaces/User";
import userModel from '../models/user.model'
import * as userSQL from "../sqlFunctions.js/loginUser";

const login = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body

		loginValidation(username, email, password);

		let user = await userModel.findUserByEmail(email)
		//?
		let usersql = await userSQL.findUserByEmail(email)
		console.log('finded user by email: ', usersql)
		//?
		if (user && !user.banned) {
			userModel.compareUsernames(user.username, username)

			await userModel.comparePassords(user.password, password)

			const token = await userModel.createToken(user)
			//?! user role 
			const tokengql = await userSQL.createToken(String(usersql.id), usersql.username, usersql.role)
			console.log('token created: ', tokengql)
			//?
			return res.send({ token })
		}

		if (user && user.banned) {
			userModel.bannedNotification(user.banned)
		}
		//?
		const createdUserSQL = await userSQL.createUser(username, email, password);
		console.log('New user has created', createdUserSQL)
		//?
		const createdUser = await userModel.createUser(email, password, username)
		const token = await userModel.createToken(createdUser)
		//?
		const tokensql = await userSQL.createToken(String(createdUserSQL.id), createdUserSQL.username, createdUserSQL.role[0])
		console.log('token created2:', tokensql);
		//?
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