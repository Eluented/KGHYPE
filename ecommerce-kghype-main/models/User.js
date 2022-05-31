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
                const oldUser = await User.findByEmail( data.email );

                console.log(data.email) // remove later
                if (oldUser) {
                    resolve ("This email address is already being used");
                } else {
                    const user = await Schema.User.create(data);

                    resolve(new User(user));
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
                const user = await User.findByEmail(email);

                // if there is an email - compares password with encrypted password in db
                if (user) {
                    const auth = await bcrypt.compare(password, user.password)
                    if (auth) {
                        resolve(new User(user))
                    } else {
                        throw Error('Password incorrect')
                    }
                };

                resolve(user);
            } catch (err) {
                reject(`User with email: ${data.email} not found: ${err}`);

                console.log(err)
            };
        });
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

    static updateEmail(email, password, newPassword) {
        return new Promise(async (resolve, reject) => {
          try {
            const user = await this.findByEmail(email);
            console.log(user)
            // if there is an email - compares password with encrypted password in db
            if (user) {
                const auth = await bcrypt.compare(password, user.password)
                if (auth) {
                    // hashing password before updating it 
                    // (schema middleware doesnt do it when it updates)
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = await bcrypt.hash(newPassword, salt);  

                    const updateUser = await Schema.User
                    .updateOne(
                        { email: email },
                        { $set: { password: hashedPassword } }
                    )

                    resolve(new User(updateUser));
                } else {
                    throw Error('Password Incorrect');
                } 
            };
          } catch (err) {
            reject(`Error Updating User: ${err}`);

            console.log(err)
          };
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