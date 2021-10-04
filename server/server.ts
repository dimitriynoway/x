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
require('./auth/google.passport')

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