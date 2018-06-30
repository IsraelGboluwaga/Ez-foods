const foodRequestHandler = require('./foods.ctrl');
const userHandler = require('./foods.ctrl');
const aboutHandler = require('./foods.ctrl');

const requestHandler = (req, res) => {
    let response;
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    text = text.toString();

    if (text === '') {
        response = `CON Welcome to Ez Foods!
        1. Order food
        2. Create Account
        3. About us
        `;
        res.send(response);
    }
    else if (text[0] === '1') {
        foodRequestHandler(res, text);
    }
    else if (text[0] === '2') {
        userHandler(res, text);
    }
    else if (text[0] === '3') {
        aboutHandler(res, text);
    }
};

module.exports = requestHandler;