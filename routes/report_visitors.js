var express = require('express');
var router = express.Router();

/* GET reprot_visitors page*/
router.get('/report_visitors', function(req, res) {
    res.locals.user = req.session.user;
    res.render('report_visitors', { title: 'Smart Washrooms - Report : Visitors', heading: 'Visitors' });
});



module.exports = router;