import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();

import { createConnection } from 'typeorm'
import { User } from "./entity/User";
import { Message } from './entity/Message'
import app from './app'

(async () => {

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

		app()

	} catch (err) {
		console.log(err)
	}
})()