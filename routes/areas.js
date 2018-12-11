var express = require('express');
var router = express.Router();

//get all users
router.get('/areas', function(req, res) {

    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var data;
    client.post("http://" + req.get('host') + "/api/v1/area.get_all", function(areas, response) {
        res.locals.data = areas;
        res.locals.user = req.session.user;
        res.render('areas', { title: 'Smart Washrooms - Areas', heading: 'Area Management' });
    });
});

module.exports = router;