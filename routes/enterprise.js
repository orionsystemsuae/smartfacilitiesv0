var express = require('express');
var router = express.Router();


//gives a blank web form
router.get('/enterprise', function(req, res, next) {
    res.locals.data = null;
    res.locals.user = req.session.user;
    res.render('enterprise', { title: 'Smart Washrooms - New Enterprise', heading: 'New Enterprise' });
});

//gets the enterprise information and shows on the form
router.get('/enterprise/:uuid', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: { uuid: req.params.uuid },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://" + req.get('host') + "/api/v1/enterprise.getByUUID", args, function(enterprise, response) {
        res.locals.data = enterprise.data.result;
        res.locals.user = req.session.user;
        res.render('enterprise', { title: 'Smart Washrooms - Enterprise Profile', heading: 'Enterprise Profile' });
    });
});



//add the enterprise information to database and goes back to listings
router.post('/enterprise/add', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: {
            id: req.body.id,            
            uuid: req.body.uuid,            
            name: req.body.name,
            abbr: req.body.abbr,            
            description: req.body.description,
            status: req.body.status,
            created: req.body.creationdate,            
            modified: req.body.modificationdate,
            createdby: 1
        },
        headers: { "Content-Type": "application/json" }
    }; 
    client.post("http://" + req.get('host') + "/api/v1/enterprise.add", args, function(data, response) {
        res.redirect('/enterprises');
    });
});

router.post('/enterprise/update', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var args = {
        data: {
            name: req.body.name,
            description: req.body.description,
            modified: req.body.modified,
            uuid: req.body.uuid,
            abbr: req.body.abbr,
            id: req.body.id,
            status: req.body.status,
            createdby: 1
        },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://" + req.get('host') + "/api/v1/enterprise.update", args, function(data, response) {
        res.redirect('/enterprises');
    });
});


//delete the enterprise information to database and goes back to listings
router.post('/enterprise/delete', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: {
            name: req.body.name,
            description: req.body.description,
            modified: req.body.modified,
            uuid: req.body.uuid,
            abbr: req.body.abbr,
            id: req.body.id,
            status: req.body.status,
            createdby: 1
        },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://" + req.get('host') + "/api/v1/enterprise.removeByUUID", args, function(data, response) {
        res.redirect('/enterprises');
    });
});
module.exports = router;