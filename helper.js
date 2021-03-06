const getFoodName = (code) => {

    let foodName;
    if (code === '1*1') {
        foodName = 'Fried rice';
    }
    else if (code === '1*2') {
        foodName = 'Jollof rice';
    }
    else if (code === '1*3') {
        foodName = 'Fried and Jollof rice';
    }
    else if (code === '1*4') {
        foodName = 'White rice';
    }
    else if (code === '1*5') {
        foodName = 'White rice and beans';
    }
    else if (code === '1*6') {
        foodName = 'Spaghetti';
    }
    else if (code === '1*7') {
        foodName = 'Bread and Beans (BB)';
    }
    else {
        foodName = 'food';
    }
    return foodName;
};

const getFullFoodNameFromCode = (code) => {
    code = code.toString();
    const code_numbers = [];
    let food, meat, extra, output;
    for (let i = 4; i <= code.length; i += 2) {
        code_numbers.push(code[i]);
    }

    food = this.getFoodName(code.slice(0, 3));

    switch (code_numbers[0]) {
        case 1:
            meat = 'beef';
            break;
        case 2:
            meat = 'turkey';
            break;
        case 3:
            meat = 'chicken';
            break;
        case 4:
            meat = 'no';
            break;
    }

    switch (code_numbers[1]) {
        case 1:
            extra = 'plantain';
            break;
        case 2:
            extra = ' an egg';
            break;
        case 3:
            extra = 'plantain and an egg';
            break;
    }

    output = extra ? food + ' and ' + meat + ' with ' + extra
        : food + ' and ' + meat;
    return output;
};

const getBill = (ordered_food) => {
    return '#1100';
};

const proceedInteraction = (res, response) => {
    res.send('CON ' + response);
};

const endInteraction = (res, response) => {
    res.send('END ' + response);
};

const generateTransactionReference = () => {
    const letters = 'abcdefghojklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const ref = [];
    let letter_random_no, num_random_number;
    for (let i = 0; i < 10; i++) {
        letter_random_no = (Math.random() * 40).toFixed();
        num_random_number = (Math.random() * 10).toFixed();
        if (i < 7) {
            ref.push(letters[letter_random_no]);
        } else {
            ref.push(numbers[num_random_number]);
        }
    }
    return ref.join('');
};

module.exports = {
    getFoodName,
    getFullFoodNameFromCode,
    getBill,
    proceedInteraction,
    endInteraction,
    generateTransactionReference
};
