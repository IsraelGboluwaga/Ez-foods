const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    accountnumber: String,
    accountbank: String,
    orders: [{
        type: String
    }]
});

module.exports = User = mongoose.model('User', UserSchema);

module.exports.getUserByPhoneNumber = (phone, cb) => {
    User.findOne({phone}, cb);
};

module.exports.createUser = (newUser, cb) => {
    newUser.save(cb);
};