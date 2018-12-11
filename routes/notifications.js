var express = require('express');
var router = express.Router();

/* GET notification page*/
router.get('/notifications', function(req, res) {
    res.locals.user = req.session.user;
    res.render('notifications', { title: 'Smart Washrooms - Notifications', heading: 'Notifications' });
});


module.exports = router;