import mongoose from 'mongoose'

module.exports = mongoose.connect(
	process.env.DATABASE_URL as string,
	() => console.log('DB is connected'),
);