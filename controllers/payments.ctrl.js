const Ravepay = require('ravepay');
const {proceedInteraction, endInteraction, generateTransactionReference} = require('../helper');
const User = require('../models/user');
const publicKey = process.env.RAVE_PUBLIC_KEY;
const secretKey = process.env.RAVE_SECRET_KEY;

const rave = new Ravepay(publicKey, secretKey, false);

const paymentHandler = (res, text, phoneNumber) => {
    let response;
    let userDetails = getUserCardDetails(phoneNumber);
    const transactionReference = generateTransactionReference();

    if (text === '1') {

        if (userDetails) {
            const payload = {
                "accountnumber": userDetails.accountnumber,
                "accountbank": userDetails.accountbank,
                "currency": "NGN",
                "country": "NG",
                "amount": "800",
                "email": userDetails.email,
                "phonenumber": userDetails.phonenumber,
                "firstname": userDetails.name.split(' ')[0],
                "lastname": userDetails.name.split(' ')[1],
                "IP": "355426087298442",
                "txRef": transactionReference,
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            };

            rave.Account.charge(payload).then((resp) => {
                response = resp.body.status;
                endInteraction(res, response);
            }).catch((err) => {
                throw err;
            });
        }

        //todo: Handle case for unregistered user

    }
};

module.exports = paymentHandler;

const getUserCardDetails = (phoneNumber) => {
    User.getUserByPhoneNumber(phoneNumber, (err, user) => {
        if (err) throw err;
        const condition = user.accountnumber && accountbank;
        const user_details = {
            name: user.name,
            email: user.email,
            accountnumber: user.accountnumber,
            accountbank: user.accountbank,
        };

        return condition ? user_details : false;
    });
};