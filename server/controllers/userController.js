import loginValidation from "../functions/loginValidation"
import userModel from '../models/user.model'

const login = async (req, res) => {
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

		userModel.bannedNotification(user.banned)

		user = await userModel.createUser(email, password, username)
		const token = await userModel.createToken(user)
		return res.send({ token })
	} catch (err) {
		res.status(400).send({ error: err.message })
	}
}
export default {
	login
}