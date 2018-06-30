const {getFoodName, proceedInteraction, endInteraction} = require('../helper');

const foodRequest = (res, text) => {
    let response;

    const food_condition = text === '1*1' || text === '1*2' || text === '1*3' ||
        text === '1*4' || text === '1*5' || text === '1*6' || text === '1*7';


    if (text === '1') {
        response = `Here are the available delicacies:
        1. Fried rice
        2. Jollof rice
        3. Fried and Jollof rice
        4. White rice
        5. White rice and beans
        6. Spaghetti
        7. Bread and Beans`;

        res.send(response);
    }
    else if (food_condition) {
        response = `CON Which would you prefer to have with your ${getFoodName(text)}:
        1. Beef
        2. Turkey
        3. Chicken
        4. None`;

        res.send(response);
    }
    else if (text.length > 5) {
        response = `CON Would you also like any of these:
        1. Plantain
        2. Egg
        3. Plantain and egg`;

        res.send(response);
    }
};

module.exports = foodRequest;