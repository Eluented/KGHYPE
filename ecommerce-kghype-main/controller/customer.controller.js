const bcrypt = require('bcryptjs');
const CustomerModel = require('../models/user');

exports.addCustomer = async (req, res) => {
    try{
        const { email, password, cfpassword, country, firstname, lastname, phone } = req.body;
        if (!(email && password && cfpassword && country && firstname && lastname && phone)) {
            console.log("Check")
            return res.status(400).send("All input is required");
        }
        const oldUser = await CustomerModel.findOne({ email });
		if (oldUser) {
			return res.status(409).send("Already Exist.");
		}
        let encryptedPassword = await bcrypt.hash(password, 10);
        const customer = { ...req.body, password:encryptedPassword, cfpassword: encryptedPassword };
        const data = await new CustomerModel(customer).save();
        return res.status(200).send({ data: data });
    } catch (err) {
        console.log(err);
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await CustomerModel.find({ body: req.body.email });
        return res.status(200).send({ data: customers })
    }
    catch (err) {
        console.log(err)
    }
}

exports.updateCustomer = async ( req, res ) => {
    const { id } = req.body;
    try{
        const customer = await CustomerModel.findOneAndUpdate({
            _id: id
        }, req.body
        )
        if(customer) {
            return res.status(200).send({data:customer});
        }
    } catch (err) {
        console.log(err);
    }
}

exports.deleteCustomer = async ( req, res ) => {
    const { id } = req.body;
    try{
        const customer = await CustomerModel.findOneAndDelete({
            _id: id
        })
        if(customer) {
            return res.status(200).send({data:customer});
        }
    } catch (err) {
        console.log(err);
    }
}