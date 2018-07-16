const {proceedInteraction, endInteraction, getFoodName, getFullFoodNameFromCode, getBill} = require('../helper');

const foodRequestHandler = (res, text) => {
    let response;
    let length = text.length;

    if (text === '1') {
        response = `Here are the available delicacies:
        1. Fried rice
        2. Jollof rice
        3. Fried and Jollof rice
        4. White rice
        5. White rice and beans
        6. Spaghetti
        7. Bread and beans (BB)`;

        proceedInteraction(res, response);
    }
    else if (length === 3) {
        response = `Which would you prefer to have with your ${getFoodName(text)}:
        1. Beef
        2. Turkey
        3. Chicken
        4. None`;

        proceedInteraction(res, response);
    }
    else if (length === 5) {
        response = `Would you also like any of these:
        1. Plantain
        2. Egg
        3. Plantain and egg
        4. None`;

        proceedInteraction(res, response);
    }
    else if (length === 7) {
        response = `You have ordered ${getFullFoodNameFromCode(text)}. Press 1 to confirm.`;

        proceedInteraction(res, response);
    }
    else if (length === 9) {
        let text_for_food = text.slice(text(0, 7)),
            ordered_food = getFullFoodNameFromCode(text_for_food);

        response = `Your bill is ${getBill(ordered_food)} and delivery is #200. Press 1 to make payments.`;

        proceedInteraction(res, response);
    }
    else if (length ===2 || length === 4 || length ===6 || length === 8) {
        endInteraction(res, 'Invalid entry');
    }
};

module.exports = foodRequestHandler;