var router = require('express').Router();
var email = require('../../utils/email.js');

router.post('/send', function(req, res, next) {
  email.sendEmail(req, res);
});

module.exports = router;
