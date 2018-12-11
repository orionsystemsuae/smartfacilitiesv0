var express = require('express');
var router = express.Router();

router.get('/signout', function(req, res) {
    req.session.reset();
    res.redirect('/signin');

});

module.exports = router;