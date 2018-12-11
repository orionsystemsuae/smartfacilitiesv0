var express = require('express');
var router = express.Router();

//get all users
router.get('/sites', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    client.post("http://" + req.get('host') + "/api/v1/site.get_all", function(data, response) {
        res.locals.data = data;
        res.locals.user = req.session.user;
        res.render('sites', { title: 'Smart Washrooms - Sites', heading: 'Site Management' });
    });
});

//delete the area information from database and goes back to listings
router.post('/sites/delete', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: {
            id: req.body.id
        },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://" + req.get('host') + "/api//v1/area.removeById", args, function(data, response) {
        res.redirect('/areas');
    });
});

//create the user information to database and goes back to listings
router.post('/sites/add', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: {
            name: req.body.name
        },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://" + req.get('host') + "/api//v1/area.add", args, function(data, response) {
        res.redirect('/areas');
    });
});



module.exports = router;