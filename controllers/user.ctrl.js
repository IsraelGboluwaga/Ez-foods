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
    else if (text_array[2] && !text_array[3]) {
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
                response = 'Your account is created. Press 1 to add bank details for easy payment. Press 00 to go back to the main menu.';
                proceedInteraction(res, response);
            }
        })
    }
    //Get bank
    else if (text_array[3] === '1' && !text_array[4]) {
        User.getUserByPhoneNumber(phoneNumber, (err, user) => {
            if (err) throw err;
            if (!user)
                endInteraction(res, 'Oops, you do not have an account with Ez-foods');
        });
        //Handle this properly

        response = `Kindly select one of the following banks: 
            1. ACCESS BANK
            2. GTBANK
            3. FIRST BANK
            4. ZENITH BANK
            5. DIAMOND BANK`;

        proceedInteraction(res, response);
    }

    //Get account number
    else if (text_array[4] && text_array[4] === 10 && !text_array[5]) {
        const accountNumber = text_array[4];
        let bankcode;
        //Use a switch case for the banks
        switch (text_array[3]) {
            case 1:
                bankcode = '044';
                break;
            case 2:
                bankcode = '058';
                break;
            case 3:
                bankcode = '011';
                break;
            case 4:
                bankcode = '057';
                break;
            case 5:
                bankcode = '063';
                break;
            default:
                endInteraction(res, 'Invalid input');


        }

        User.getUserByPhoneNumber(phoneNumber, (err, user) => {
            if (err) throw err;

            if (user) {
                user.accountnumber = accountNumber;
                user.accountbank = bankcode;
                user.update();
                response = 'Bank saved.';
                proceedInteraction(res, response);
            }
        });
    }
    //Complete transaction
    else if (text_array[5]) {
        response = 'Your bank details are saved. Thanks for trusting us with it. Press 00 to go to the top menu.';
        proceedInteraction(res, response);
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