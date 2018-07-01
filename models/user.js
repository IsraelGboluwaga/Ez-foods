const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    card_details: {
        cardNumber: String,
        CVV: String,
        expiry: String
    },
    orders: [{
        type: String
    }]
});

module.exports = User = model('User', UserSchema);

module.exports.getUserByPhoneNumber = (phone, cb) => {
    User.findOne({phone}, cb);
};

module.exports.createUser = (newUser, cb) => {
    newUser.save(cb);
};