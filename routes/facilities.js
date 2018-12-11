var express = require('express');
var router = express.Router();

//get all users
router.get('/facilities', function(req, res) {

    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var data;
    client.post("http://" + req.get('host') + "/api/v1/facility.get_all", function(facilities, response) {
        res.locals.data = facilities.data.result;
        res.locals.user = req.session.user;
        res.render('facilities', { title: 'Smart Washrooms - Facilities', heading: 'Facility Management' });
    });
});

module.exports = router;