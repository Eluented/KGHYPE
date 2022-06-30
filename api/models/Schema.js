const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password Required'],
        minlength: [5, 'Password must be at least 5 characters']
    },
    country: {
        type: String,
        required: [true, 'Country is Required']
    },
    firstname: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your last name']
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number']
    },
    balance: Number,
    role: {
        type: String,
        default: "Customer"
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
    primary_img: {
        type: String,
        required: [true, 'Please enter an image']
    },
    images: [String]
});

const MessageSchema = new mongoose.Schema({
    author: String,
    message_content: String,
    sent_at: Date
});

const OrderSchema = new mongoose.Schema({
    order_time: Date,
    order_number: {
        type: Number,
        required: [true, "Enter order number"]
    },
    products: [ProductSchema],
    total_price: {
        type: Number,
        required: [true, "Enter total price"]
    },
    order_status: [

        "Pending Payment",
        "Paid",
        "purchased",
        "Seller Shipped",
        "Delivered",
        "Stored in a Warehouse",
        "Shipped Internationally",
        "Return Pending",
        "Return Approved",
        "Return Shipped Back",
        "Refunded"

    ],
    messages: [MessageSchema],
    quality_pictures: [String],
    promo_code: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    tracking_number: {
        type: String,
        required: false
    }

})

// mongoose middleware - hashes + salts password before it enters
UserSchema.pre('save', function (next) {
    const user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);
const Message = mongoose.model("Message", MessageSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { User, Product };