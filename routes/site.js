var express = require('express');
var router = express.Router();


//gives a blank web form
router.get('/site', function(req, res, next) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var data;
    //load enterprise data for enterprise dropdown
    client.get("http://" + req.get('host') + "/api/v1/enterprise.get_all", function(enterprises, response) {
        res.locals.data = null;
        res.locals.enterprises = enterprises;
        res.locals.user = req.session.user;
        res.render('site', { title: 'Smart Washrooms - New Site', heading: 'New Site', email: req.session.email });
    });
});

//gets the user information and shows on the form
router.get('/site/:uuid', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: { uuid: req.params.uuid },
        headers: { "Content-Type": "application/json" }
    };

    // direct way 
    var data;
    console.log('uuid: ' + req.params.uuid);
    client.post("http://" + req.get('host') + "/api/v1/area.getByUUID", args, function(site, response) {
        res.locals.data = site.data.result;
        client.post("http://" + req.get('host') + "/api/v1/enterprise.get_all", function(enterprises, response) {
            res.locals.enterprises = enterprises.data.result;
            res.locals.user = req.session.user;
            res.render('site', { title: 'Smart Washrooms - Site Profile', heading: 'Site Profile', email: req.session.email });
        });
    });
});



//add the user information to database and goes back to listings
router.post('/site/add', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();

    // direct way 
    var args = {
        data: {
            name: req.body.name,
            abbr: req.body.abbr,
            description: req.body.description,
            parrentid: -1,
            type: -1,
            enterpriseid: req.body.enterpriseid,
            uuid: req.body.uuid,
            status: 1,
            createdby: 1
        },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://" + req.get('host') + "/api/v1/area.add", args, function(data, response) {
        res.redirect('/sites');
    });
});

router.post('/site/update', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var args = {
        data: {
            uuid: req.body.uuid,
            name: req.body.name,
            abbr: req.body.abbr,
            type: -1,
            status: req.body.status,
            description: req.body.description,
            parrentid: -1,
            enterpriseid: req.body.enterpriseid
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/area.update", args, function(data, response) {
        res.redirect('/sites');
    });
});


//delete the user information to database and goes back to listings
router.post('/site/delete', function(req, res) {

    var Client = require('node-rest-client').Client;
    var client = new Client();

    // direct way 
    var args = {
        data: {
            uuid: req.body.uuid
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/area.removeByUUID", args, function(data, response) {
        res.redirect('/sites');
    });
});
module.exports = router;