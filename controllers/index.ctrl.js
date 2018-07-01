const foodRequestHandler = require('./foods.ctrl');
const {userHandler, profileHandler} = require('./user.ctrl');
const aboutHandler = require('./about.ctrl');
const {proceedInteraction, endInteraction} = require('../helper');

const requestHandler = (req, res) => {
    let response;
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    text = text.toString();

    if (text === '') {
        response = `Welcome to Ez Foods!
        1. Order food
        2. Create Account
        3. Your profile
        4. About us
        `;

        proceedInteraction(res, response);
    }
    else if (text[0] === '1' && text <= 9) {
        //Done 90% - getBill() left
        foodRequestHandler(res, text);
    }
    else if (text[0] === '1' && text > 9) {
        //Payments. After saving details, use OTP to confirm it's you.
        // Address is collected after payments
    }
    else if (text[0] === '2') {
        //OTP to confirm registration
        userHandler(res, text, phoneNumber);
    }
    else if (text[0] === '3') {
        //User profile
        profileHandler(res, text, phoneNumber);
    }
    else if (text[0] === '4') {
        //Done
        aboutHandler(res, text);
    }
    else {
        endInteraction(res, 'Invalid entry');
    }
};

module.exports = requestHandler;