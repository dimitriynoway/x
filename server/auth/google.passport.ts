import passport from 'passport'
import jwt from 'jsonwebtoken'
import createUserGoogle from '../functions/createUserGoogle'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import User from '../model/User'

import { Express } from 'express'

interface SuperUser extends Express.User {
	email: string
}

passport.use(new Strategy({
	clientID: process.env.GOOGLE_CLIENT_ID as string,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
	callbackURL: `${process.env.SERVER}/google/callback`
},
	async function (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
		try {
			const user = await User.findOne({ email: profile._json.email })

			if (!user) {
				const createdUser = await createUserGoogle(profile)

				if (createdUser) {
					return done(null, createdUser)
				}

				return done('error with db', undefined)
			}

			return done(null, user)
		} catch (err) {
			done(err as Error, undefined)
		}
		return done(null, profile)
	}
));
passport.serializeUser((user, done) => {
	done(null, user)
})
passport.deserializeUser<SuperUser>(async (us, done) => {
	try {
		const email = us.email;
		const user = await User.findOne({ email })

		if (!user) {
			return done(null, user)
		}

		const token = jwt.sign({
			id: user._id,
			username: user.username,
			role: user.role
		}, process.env.SECRET_KEY as string)

		done(null, token)
	} catch (error) {
		done(error, null)
	}
})