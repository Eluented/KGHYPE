const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Password Required'],
        minlength: [5, 'Password must be at least 5 characters']
    },
    country:{
        type: String,
        required: [true, 'Country is Required']
    },
    firstname:{
        type: String,
        required: [true, 'Please enter your first name']
    },
    lastname:{
        type: String,
        required: [true, 'Please enter your last name']
    },
    phone:{
        type: String,
        required: [true, 'Please enter your phone number']
    }
});

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a product']
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description']
    },
    img:{
        type:String,
        required: [true, 'Please enter an image']
    }
});

// mongoose middleware - hashes + salts password before it enters
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);  
    next();
})

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);

module.exports = { User, Product };