var express = require('express');
var router = express.Router();

router.get('/message', function(req, res) {
    res.render('message', { title: 'Smart Washrooms - Message' });
});
router.post('/message', function(req, res) {
    msg = req.body.message;
    if (msg != null)
        res.render('message', { title: 'Smart Washrooms - Message', message: msg });
    else
        res.redirect('/');


});

module.exports = router;