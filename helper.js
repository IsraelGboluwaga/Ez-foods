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
    const code_numbers = [];
    let food, meat, extra;
    for (let i = 0; i < code.length; i += 2) {
        code_numbers.push(code[i]);
    }

    switch (code_numbers[1]) {
        case 1:
            food = 'Fried rice';
            break;
        case 2:
            food = 'Jollof Rice';
            break;
        case 3:
            food = 'Fried and Jollof rice';
            break;
        case 4:
            food = 'White rice';
            break;
        case 5:
            food = 'White rice and beans';
            break;
        case 6:
            food = 'Spaghetti';
            break;
        case 7:
            food = 'Bread and beans (BB)';
            break;
    }

    switch (code_numbers[2]) {
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

    switch (code_numbers[3]) {
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

    return food + ' and ' + meat + ' with ' + extra;
};

const getBill = (ordered_food) => {
    return '#800';
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
