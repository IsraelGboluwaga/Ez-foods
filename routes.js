const router = require('express').Router();
const {requestHandler} = require('./controllers/index.ctrl');

router.get('*', (req, res) => {
    res.send('This is a USSD Application by Israel Gboluwaga :)');
});

router.post('/initiate', requestHandler);

module.exports = router;