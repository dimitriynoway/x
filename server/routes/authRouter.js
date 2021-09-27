import express from "express";
const authRouter = express.Router();

authRouter.get("/fail", (req, res) => {
	res.redirect(401, `${process.env.CLIENT}/login`)
})
authRouter.get("/getUser", (req, res) => {
	res.send(req.user)
})
authRouter.get("/logout", (req, res) => {
	if (req.user) {
		req.logout()
		res.send("success")
	}
})

export default authRouter