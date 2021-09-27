import bcrypt from 'bcrypt'

export default async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}