var express = require('express');
var router = express.Router();

/* GET home dashboard */
router.get('/home', function(req, res) {
    res.locals.user = req.session.user;
    res.render('home', { title: 'Smart Washrooms - Home', heading: 'Home' });
});



module.exports = router;