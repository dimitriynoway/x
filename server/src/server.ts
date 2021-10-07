/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import app from './app';

dotenv.config();

try {
	createConnection().then(async connection => {
		await connection.runMigrations()
	});
	console.log('sql connected');
	app();
} catch (err) {
	console.log(err);
}
