var express = require('express');
var router = express.Router();

router.get('/reset', function(req, res) {

    res.render('reset', { title: 'Smart Washrooms - Reset' });
});

module.exports = router;