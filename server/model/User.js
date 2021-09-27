const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String },
	username: { type: String, required: true },
	role: [{ type: String, required: true }],
	mutted: { type: Boolean, required: true },
	banned: { type: Boolean, required: true },
});
module.exports = mongoose.model('User', userSchema);
