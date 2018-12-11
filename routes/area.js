var express = require('express');
var router = express.Router();


//gives a blank web form
router.get('/area', function(req, res, next) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var data;
    //load site data for site dropdown
    client.get("http://" + req.get('host') + "/api/v1/site.get_all", function(sites, response) {
        res.locals.data = null; // new area so this field is null
        res.locals.sites = sites;
        res.locals.user = req.session.user;
        res.render('area', { title: 'Smart Washrooms - New Area', heading: 'New Area' });
    });
});

//gets the user information and shows on the form
router.get('/area/:uuid', function(req, res) {
    var args = {
        data: { uuid: req.params.uuid },
        headers: { "Content-Type": "application/json" }
    };

    // direct way 
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var data;
    console.log('uuid: ' + req.params.uuid);
    //load site data for site dropdown
    client.post("http://" + req.get('host') + "/api/v1/area.getByUUID", args, function(area, response) {
        res.locals.data = area.data.result;
        res.locals.user = req.session.user;
        client.post("http://" + req.get('host') + "/api/v1/site.get_all", function(sites, response) {
            res.locals.sites = sites.data.result;
            res.render('area', { title: 'Smart Washrooms - Area Profile', heading: 'Area Profile' });
        });
    });
});



//add the user information to database and goes back to listings
router.post('/area/add', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var args = {
        data: {
            uuid: req.body.uuid,
            name: req.body.name,
            type: req.body.type,
            status: req.body.status,
            abbr: req.body.abbr,
            description: req.body.description,
            parrentid: req.body.parrentid,
            enterpriseid: -1,
            createdby: 1
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/area.add", args, function(data, response) {
        res.redirect('/areas');
    });
});

router.post('/area/update', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var args = {
        data: {
            uuid: req.body.uuid,
            name: req.body.name,
            type: req.body.type,
            status: req.body.status,
            abbr: req.body.abbr,
            description: req.body.description,
            parrentid: req.body.parrentid,
            enterpriseid: -1
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/area.update", args, function(data, response) {
        // parsed response body as js object 
        //console.log(data);
        // raw response 
        //console.log(response);
        //res.locals.data = data;
        res.redirect('/areas');
    });
});


//delete the user information to database and goes back to listings
router.post('/area/delete', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();

    // direct way 
    var args = {
        data: {
            uuid: req.body.uuid,
            name: req.body.name
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/area.removeByUUID", args, function(data, response) {
        // parsed response body as js object 
        //console.log(data);
        // raw response 
        //console.log(response);
        //res.locals.data = data;
        res.redirect('/areas');
    });
});
module.exports = router;