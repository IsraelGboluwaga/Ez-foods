const User = require('../models/user');
const {proceedInteraction, endInteraction} = require('../helper');

const userHandler = (res, text, phoneNumber) => {
    let response;
    const text_array = text.split('*');

    if (text === '2') {
        User.getUserByPhoneNumber(phoneNumber, (err, user) => {
            if (err) throw err;
            if (user) {
                response = `You already have an account on Ez Foods. You're registered with the name- ${user.name}`;
                endInteraction(res, response);
            }
        });

        response = `Kindly enter your full name and email below. Each separated by a comma e.g. John Doe, jdoe@foods.co`;
        proceedInteraction(res, response);
    }
    else if (text_array[1] && !text_array[2]) {
        response = 'Kindly enter your address for easy delivery.';
        proceedInteraction(res, response);
    }
    else if (text_array[2]) {
        let input = text_array[1].slice(','),
            address = text_array[2];

        const user_params = {
                name: input[0],
                email: input[1],
                phone: phoneNumber,
                address
            },
            newUser = new User(user_params);

        User.createUser(newUser, (err, created) => {
            if (err) throw err;
            if (created) {
                response = 'Your account is created. Press 1 to add card details for easy payment. Press 0 to do that later.'


                //How??


            }
        })
    }
};

const profileHandler = (res, text, phoneNumber) => {
    let response;

    if (text) {
        User.getUserByPhoneNumber(phoneNumber, (err, user) => {
            if (err) throw err;

            if (!user)
                endInteraction(res, 'Oops. You do not have an account with us. You can create one in the main menu.');

            if (user) {
                response = `Here are your details:
                Name: ${user.name},
                Email: ${user.email},
                Phone number: ${user.phone},
                Address: ${user.address}`;

                endInteraction(res, response);
            }
        })
    }
};

module.exports = {
    userHandler,
    profileHandler
};