const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
	try{
		const { email, password, cfpassword, country, firstname, lastname, phone } = req.body;
		if (email === undefined || password === undefined || cfpassword === undefined || country === undefined || firstname === undefined || lastname === undefined|| phone === undefined) {
			return res.send({msg:"All input is required"});
		}
	
		const oldUser = await UserModel.findOne({ email });
		if (oldUser) {
			return res.status(409).send("Already Exist. Please Login");
		}
		let encryptedPassword = await bcrypt.hash(password, 10);
		const user = { ...req.body, password: encryptedPassword, cfpassword: encryptedPassword };
		const result = await new UserModel(user).save();
		return res.status(200).send({ data: result });
	} catch (err){
		console.log(err);
	}
};

exports.signIn = (req, res) => {
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
}