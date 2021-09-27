import User from "../model/User"

export default async (username) => {
	const notUniqeUsername = await User.findOne({ username })
	if (notUniqeUsername) {
		throw new Error("You can't use this username")
	}
}