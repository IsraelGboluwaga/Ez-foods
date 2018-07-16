const foodRequestHandler = require('./foods.ctrl');
const {userHandler, profileHandler} = require('./user.ctrl');
const aboutHandler = require('./about.ctrl');
const paymentHandler = require('./payments.ctrl');
const {proceedInteraction, endInteraction} = require('../helper');

const requestHandler = (req, res) => {
    let response;
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    text = text.toString();
    console.log('Initial text', text);
    console.log('Initial text length', text.length);
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
    else if (text[0] === '1' && text < 10) {
        console.log('Text in food:', text);
        foodRequestHandler(res, text);
    }
    else if (text[0] === '1' && text[10] === '1' && text.length > 10) {
        console.log('Text in food2:', text);
        text = text.slice(10);
        //Payments
        paymentHandler(req, text, phoneNumber);
        // Address is collected after payments
    }
    else if (text[0] === '2') {
        console.log('Text in user:', text);
        userHandler(res, text, phoneNumber);
    }
    else if (text[0] === '3') {
        console.log('Text in profile:', text);
        //User profile
        profileHandler(res, text, phoneNumber);
    }
    else if (text[0] === '4') {
        console.log('Text in about:', text);
        //Done
        aboutHandler(res, text);
    }
    else {
        console.log('Text in invalid:', text);
        endInteraction(res, 'Invalid entry');
    }
};

module.exports = {requestHandler};