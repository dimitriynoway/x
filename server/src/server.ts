/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
// import User from './entity/User';
// import Message from './entity/Message';
import app from './app';

dotenv.config();

try {
	createConnection();
	console.log('sql connected');
	app();
} catch (err) {
	console.log(err);
}

// {
// 	type: 'mysql',
// 	host: process.env.DB_HOST as string,
// 	port: Number(process.env.DB_PORT),
// 	username: process.env.DB_USERNAME,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME,
// 	synchronize: true, // migration
// 	entities: [
// 		User,
// 		Message,
// 	],
// }
