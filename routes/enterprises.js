var express = require('express');
var router = express.Router();

//get all users
router.get('/enterprises', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var data;
    client.post("http://" + req.get('host') + "/api/v1/enterprise.get_all", function(data, response) {
        res.locals.data = data.data.result;
        res.locals.user = req.session.user;
        res.render('enterprises', { title: 'Smart Washrooms - Enterprises', heading: 'Enterprise Management', email: req.session.email });
    });
});

router.post('/enterprises', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var data;
    client.post("http://" + req.get('host') + "/api/v1/enterprise.get_all", function(data, response) {
        res.locals.data = data;
        res.locals.user = req.session.user;
        res.render('enterprises', { title: 'Smart Washrooms - Enterprises', heading: 'Enterprise Management', email: req.session.email });
    });
});

//delete the area information from database and goes back to listings
router.post('/enterprises/delete', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var args = {
        data: { id: req.body.id },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://" + req.get('host') + "/api//v1/enterprise.removeById", args, function(data, response) {
        res.redirect('/enterprises');
    });
});

module.exports = router;