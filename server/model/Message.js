const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	userId: { type: String, required: true },
	createdAt: { type: Date, required: true },
	message: { type: String, required: true, maxLength: 200 },
	bgColor: { type: String, required: true },
	type: { type: String, required: true },
	username: { type: String, required: true }
});
module.exports = mongoose.model('Message', messageSchema);
