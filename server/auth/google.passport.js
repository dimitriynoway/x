import passport from 'passport'
import jwt from 'jsonwebtoken'
import createUserGoogle from '../functions/createUserGoogle'
import { Strategy } from 'passport-google-oauth20'
const User = require('../model/User')

passport.use(new Strategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: `${process.env.SERVER}/google/callback`
},
	async function (accessToken, refreshToken, profile, done) {
		try {
			const user = await User.findOne({ email: profile._json.email })

			if (!user) {
				const createdUser = await createUserGoogle(profile)

				if (createdUser) {
					return done(null, createdUser)
				}

				return done('error with db', null)
			}

			return done(null, user)
		} catch (err) {
			done(err, null)
		}
		return done(null, profile)
	}
));
passport.serializeUser((user, done) => {
	done(null, user.email)
})
passport.deserializeUser(async (email, done) => {
	try {
		const user = await User.findOne({ email })

		if (!user) {
			return done(null, user)
		}

		const token = jwt.sign({
			id: user._id,
			username: user.username,
			role: user.role
		}, process.env.SECRET_KEY)

		done(null, token)
	} catch (error) {
		done(err, null)
	}
})