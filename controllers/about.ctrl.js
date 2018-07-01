const aboutHandler = (res, text) => {
    if (text) {
        let response = 'END Ez Foods is a mobile food company which delivers food to anywhere you ask when we can, ' +
            'which is at all times. We are sure to deliver quality service- at your doorstep in 20 minutes or less.';

        res.send(response);
    }
};

module.exports = aboutHandler;