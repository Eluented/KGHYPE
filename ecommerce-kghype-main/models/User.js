const bcrypt = require('bcrypt');
const Schema = require('./Schema');

module.exports = class User {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.country = data.country;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.phone = data.phone;
    };

    static async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // checking if email already exists 
                const oldUser = await User.findOne({ email });
                console.log({email}) // remove later
                if (oldUser) {
                    resolve ("This email address is already being used");
                } else {
                    const user = await Schema.User.create(data);
                    resolve(user);
                }
            } catch (err) {
                console.log(err)
                reject('User could not be created');
            }
        });
    };


    static async update(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // unsure ?
            } catch (err) {
                reject('User could not be updated');
            }
        });
    };

    destroy() {
        return new Promise(async (resolve, reject) => {
            try {
                //let result = await // delete from database [this.id]
                //resolve (objected was deleted);
            } catch (err) {
                reject('object could not be deleted')
            }
        })
    };





}