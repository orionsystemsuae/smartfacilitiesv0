var express = require('express');
var router = express.Router();

router.get('/password', function(req, res) {
    res.render('password', { title: 'Smart Washrooms - Reset Password' });
});

router.post('/password', function(req, res) {
    res.render('password', { title: 'Smart Washrooms - Reset Password', user: req.session.user });
});

module.exports = router;