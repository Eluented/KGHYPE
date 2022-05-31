const adminRoute = require('./routes/admin-main.route');
const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('KGHYPE Backend'));

app.use('/user', userRoute);
app.use('/cp', adminRoute);
app.use('/product', productRoute);

module.exports = app;