import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from "socket.io"
import passport from 'passport'
import userRouter from './routes/userRouter';
import session from 'express-session'
import socketUse from './sockets/socket.use'
import socketOn from './sockets/socket.on'
import authRouter from './routes/authRouter';
import { createConnection } from 'typeorm'
import { User } from "./entity/User";
import { Message } from './entity/Message'


(async () => {
	require('./auth/google.passport')
	try {
		await createConnection({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "QWErty21!",
			database: "typeorm_test",
			synchronize: true,
			entities: [
				User,
				Message
			]
		})
		console.log('sql connected')
		const app = express();
		const server = http.createServer(app);
		const io = new Server(server);

		app.use(express.json());
		app.use(express.urlencoded({
			extended: true
		}));
		app.use(cors({
			origin: `${process.env.CLIENT}`,
			credentials: true
		}))
		app.use(session({
			secret: `${process.env.SESSION_SECRETE}`,
			resave: true,
			saveUninitialized: true,
		}))
		app.use(passport.initialize())
		app.use(passport.session())

		app.use('/auth', authRouter)
		app.use('/user', userRouter)

		app.get('/google',
			passport.authenticate('google', { scope: ['profile', 'email'] }));
		app.get('/google/callback',
			passport.authenticate('google', { failureRedirect: '/fail' }),
			(req, res) => {
				res.redirect(301, `${process.env.CLIENT}/google`)
			});

		io.use(socketUse)
		io.on('connection', socketOn(io));

		server.listen(process.env.SERVER_PORT, () => {
			console.log(`listening on ${process.env.SERVER}`);
			require('./database/connection')
		});
	} catch (err) {
		console.log(err)
	}
})()
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.json());
// app.use(express.urlencoded({
// 	extended: true
// }));
// app.use(cors({
// 	origin: `${process.env.CLIENT}`,
// 	credentials: true
// }))
// app.use(session({
// 	secret: `${process.env.SESSION_SECRETE}`,
// 	resave: true,
// 	saveUninitialized: true,
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// app.use('/auth', authRouter)
// app.use('/user', userRouter)

// app.get('/google',
// 	passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/google/callback',
// 	passport.authenticate('google', { failureRedirect: '/fail' }),
// 	(req, res) => {
// 		res.redirect(301, `${process.env.CLIENT}/google`)
// 	});

// io.use(socketUse)
// io.on('connection', socketOn(io));

// server.listen(process.env.SERVER_PORT, () => {
// 	console.log(`listening on ${process.env.SERVER}`);
// 	require('./database/connection')
// });