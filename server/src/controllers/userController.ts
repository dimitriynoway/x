import { Request, Response } from 'express';
import loginValidation from '../functions/loginValidation';
import {
	createUser,
	findUserByEmail,
	createToken,
	comparePassords,
} from '../services/loginUser';

interface ReqBody {
	username: string | undefined;
	email: string | undefined;
	password: string | undefined;
}

const login = async (req: Request, res: Response) => {

	try {
		const { username, email, password } = req.body as ReqBody;
		loginValidation(username, email, password);
		const user = await findUserByEmail(email);

		if (user && !user.banned) {

			if (user.username !== username) {
				throw new Error('Incorrect username');
			}

			const match = await comparePassords(user.password, password);

			if (!match) {
				throw new Error('Passwords do not match');
			}

			const token = await createToken(user.id, user.username, user.role);

			return res.send({ token });
		}

		if (user && user.banned) {
			throw new Error('You are banned');
		}

		const createdUser = await createUser(username, email, password);
		const token = await
			createToken(createdUser.id, createdUser.username, createdUser.role[0]);

		return res.send({ token });
	} catch (err) {
		return res.status(400).send({ error: err.message });
	}
};
export default {
	login,
};
