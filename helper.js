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
    else if (code === '1*3') {
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

module.exports = {
    getFoodName,
};
