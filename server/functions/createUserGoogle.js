const User = require('../model/User')

export default async (profile) => {
	const countOfUsers = await User.find().count()
	const role = countOfUsers ? ['user'] : ['admin', 'user']
	const newUser = new User({
		role,
		password: '',
		email: profile._json.email,
		username: profile._json.name,
		mutted: false,
		banned: false
	})
	const createdUser = await newUser.save()
	return createdUser
}