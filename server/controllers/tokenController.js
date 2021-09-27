const validToken = require("../functions/validToken")

exports.valid = async (req, res) => {
	const isValid = await validToken(req.headers.token)
	isValid ? res.send({ valid: true }) : res.status(400).send({ error: "Not valid token" })
}