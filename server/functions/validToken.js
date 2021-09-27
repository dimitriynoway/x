const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = async (token) => {
	let id;
	jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
		if (!decoded) {
			return false
		}
		id = decoded.id
	});
	const user = await User.findById(id)

	if (!user) {
		return false
	}
	return !user.banned
}