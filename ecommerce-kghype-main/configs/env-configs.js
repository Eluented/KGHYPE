const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');


exports.provider = express();

exports.config = () => {

    // adding Helmet to enhance your Rest API's security
    this.provider.use(helmet());

    // using bodyParser to parse JSON bodies into JS objects
    this.provider.use(bodyParser.json({
        limit:'50mb',
        extended: true
    }));

    // enabling CORS for all requests
    this.provider.use(cors());

    // adding morgan to log HTTP requests
    this.provider.use(morgan('combined'));

}