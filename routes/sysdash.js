var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/sysdash', function(req, res) {
    res.render('sysdash', { title: 'Smart Washrooms - System Performace Dashboard', heading: 'System Performace Dashboard' });
});


module.exports = router;