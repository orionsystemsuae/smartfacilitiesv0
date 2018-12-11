var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    if (req.session && req.session.user) {
        // res.redirect('/home');
        res.locals.user = req.session.user;
        res.render('index', { title: 'Smart Washrooms - Home', heading: 'Home' });
    } else
        res.redirect('/en/index.html');
});


module.exports = router;