const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function signUp(req, res){
	const { password, country, firstname, lastname, phone } = data;
	try{
		await User.create({ password, country, firstname, lastname, phone })
		res.status(201).json({ user: firstname });
	} catch (err){
		console.log(err);
	}
};

async function signIn(req, res) {
	try{
		const { email, password } = req.body;
		if (email === undefined || password === undefined) {
			return res.send({msg:"All input is required"});
		}
		UserModel.find({ email: email }, async (err, docs) => {
			if(docs.length) {
				if (docs.length && (await bcrypt.compare(password, docs[0].password))) {
					res.status(200).send({ data: docs });
				} else {
					return res.send({msg:"Password isn't correct"});
				}
			} else {
				return res.send({msg:"Email is unregistered email"});
			}
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { signUp, signIn}