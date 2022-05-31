const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function signUp(req, res){
	const { firstname, lastname, email, password, phone, country } = req.body;
	try {
		await User.create({ firstname, lastname, email, password, phone, country });

		res.status(201).json({ success: true, user: firstname });
	} catch (err){
		res.status(422).json({ success : false, message : err.message });

		console.log(err);
	}
};

async function signIn(req, res) {
	const { email, password } = req.body;
	try {
		const login = await User.login( email, password )

		res.status(200).json({ success: true, user: login.firstname })
	} catch (err) {
		res.status(422).json({ success : false, message : err.message });

		console.log(err);
	}
};

async function update(req, res){
	const { email, password, newPassword } = req.body;
	try {
		const updatedUser = await User.updateEmail(email, password, newPassword);

		res.status(200).json({ success : true, user: updatedUser.firstname})
	} catch(err){
		res.status(422).json({ success : false, message : err.message })
	}
};

module.exports = { signUp, signIn, update }