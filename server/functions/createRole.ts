import User from '../model/User'

export default async () => {
	const countOfUsers = await User.find().count();
	return countOfUsers > 0 ? ['user'] : ['user', 'admin']
}