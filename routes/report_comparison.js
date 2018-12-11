var express = require('express');
var router = express.Router();

/* GET reprot_visitors page*/
router.get('/report_comparison', function(req, res) {
    res.locals.user = req.session.user;
    res.render('report_comparison', { title: 'Smart Washrooms - Report : Facility Comparison', heading: 'Facility Comparison' });
});



module.exports = router;