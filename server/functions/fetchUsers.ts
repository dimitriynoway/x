import User from '../model/User'


export default async () => {
	const users = await User.find()
	if (!users) {
		throw new Error("Error: can't fetch user")
	}
	const filteredUsers = users.map(user => {

		return {
			id: user.id,
			username: user.username,
			banned: user.banned,
			mutted: user.mutted,
			role: user.role
		}
	})
	return filteredUsers
}