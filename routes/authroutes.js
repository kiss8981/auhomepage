const router = require('express').Router();

router.use('/', require('../routes/authroutes'));
// '/authorize'
router.use('/authorize', require('../routes/discord'));

module.exports = router;