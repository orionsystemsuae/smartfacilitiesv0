var express = require('express');
var router = express.Router();

/* GET reprot_visitors page*/
router.get('/report_facility', function(req, res) {
    res.locals.user = req.session.user;
    res.render('report_facility', { title: 'Smart Washrooms - Report : Facilites', heading: 'Facilities' });
});



module.exports = router;