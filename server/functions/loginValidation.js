export default (username, email, password) => {

	if (!email || !password || !username) {
		throw new Error("All fields should be filled")
	}

	if (username.length < 3) {
		throw new Error("Username should be longer")
	}

	if (!username.match(/[0-9a-zA-Zа-яА-Я\u0410-\u042F\u0430-\u044F\_]+/g)) {
		throw new Error("No special symbols in nickname")
	}

	if (!email.match(
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	)) {
		throw new Error("Incorrect email")
	}

	if (email.length < 8) {
		throw new Error("Email too short")
	}

	if (password.length < 8) {
		throw new Error("Password should be at least of 8 chars")
	}
};
