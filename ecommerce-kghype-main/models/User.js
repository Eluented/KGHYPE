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

                    resolve(User(user));
                }
            } catch (err) {
                console.log(err)
                reject('User could not be created');
            }
        });
    };

    static async login(email, password) {
        return new Promise(async (resolve, reject) =>{
            try {
                const user = await this.findByEmail(email);

                // if there is an email - compares password with encrypted password in db
                if (user) {
                    const auth = await bcrypt.compare(password, user.password)

                    if (auth) {
                        resolve(User(user))
                    }
                    throw Error('Password incorrect')
                }

                resolve(user);
            } catch (err) {
                reject(`User with email: ${email} not found: ${err}`);

                console.log(err)
            }
        })
    };

    // helper async function for login
    static async findByEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = Schema.User.findOne({ email: email.toLowerCase() });

                resolve(user);
            } catch (err) {
                reject(`User with email: ${email} not found`);
            }
        });
    };

    static updateEmail(email, password) {
        return new Promise(async (resolve, reject) => {
          try {
            const user = await this.findByEmail(email);
            
            // if there is an email - compares password with encrypted password in db
            if (user) {
                const auth = await bcrypt.compare(password, user.password)
                if (auth) {
                    const updateUser = await Schema.User
                    .updateOne(
                        { email: email },
                        { $set: password }
                    );

                    resolve(User(updateUser));
                }
                throw Error('Password Incorrect');
            }
          } catch (err) {
            reject(`Error Updating User: ${err}`);

            console.log(err)
          }
        });
      }

    destroy() {
        return new Promise(async (resolve, reject) => {
            try {
                // What should we delete from the user?
                resolve('It worked!')
            } catch (err) {
                reject('User could not be deleted')
            }
        })
    };

};