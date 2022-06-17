var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;

Client.init("97fe88c0-e14f-41de-90d9-965aa2d83108");

var Checkout = coinbase.resources.Checkout;

const { Charge } = coinbase.resources;

var checkoutData = {
    'name': 'The Sovereign Individual',
    'description': 'Mastering the Transition to the Information Age',
    'pricing_type': 'fixed_price',
    'local_price': {
        'amount': '100.00',
        'currency': 'USD'
    },
    'requested_info': ['name', 'email']
};
Checkout.create(checkoutData, function (error, response) {
    console.log(error);
    console.log(response);
});

// or

var checkoutObj = new Checkout();

checkoutObj.name = 'The Sovereign Individual';
checkoutObj.description = 'Mastering the Transition to the Information Age';
checkoutObj.pricing_type = 'fixed_price';
checkoutObj.local_price = {
    'amount': '100.00',
    'currency': 'USD'
};
checkoutObj.requested_info = ['name', 'email'];

checkoutObj.save(function (error, response) {
    console.log(error);
    console.log(response);
});