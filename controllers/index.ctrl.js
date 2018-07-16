const foodRequestHandler = require('./foods.ctrl');
const {userHandler, profileHandler} = require('./user.ctrl');
const aboutHandler = require('./about.ctrl');
const paymentHandler = require('./payments.ctrl');
const {proceedInteraction, endInteraction} = require('../helper');

const requestHandler = (req, res) => {
    let response;
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    text = text.toString();
    const index = text.indexOf('00'), backToTop = index !== -1;

    if (backToTop)
        text = text.slice(index + 1);

    if (text === '' || text.slice(-2) === '00') {
        response = `Welcome to Ez Foods!
        1. Order food
        2. Create Account
        3. Your profile
        4. About us
        `;

        proceedInteraction(res, response);
    }
    else if (text[0] === '1' && text.length < 10) {
        foodRequestHandler(res, text);
    }
    else if (text[0] === '1' && text[10] === '1' && text.length >= 10) {
        text = text.slice(10);
        //Payments
        paymentHandler(req, text, phoneNumber);
        // Address is collected after payments
    }
    else if (text[0] === '2') {
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

module.exports = {requestHandler};