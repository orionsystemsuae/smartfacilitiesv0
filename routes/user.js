var express = require('express');
var router = express.Router();

//gives a blank web form
router.get('/user', function(req, res, next) {
    res.locals.data = null;
    var Client = require('node-rest-client').Client;
    var client = new Client();
    client.post("http://" + req.get('host') + "/api/v1/site.get_all", function(sites, response) {
        res.locals.sites = sites.data.result;
        res.locals.user = req.session.user;
        res.render('user', { title: 'Smart Washrooms - Add User', heading: 'Add User' });
    });
});

router.get('/user/:uuid', function(req, res) {
    var args = {
        data: { uuid: req.params.uuid },
        headers: { "Content-Type": "application/json" }
    };
    var Client = require('node-rest-client').Client;
    var client = new Client();
    client.post("http://" + req.get('host') + "/api/v1/user.getByUUID", args, function(user, response) {
        res.locals.data = user.data.result;
        client.post("http://" + req.get('host') + "/api/v1/site.getByUserUUID", args, function(usersites, response) {
            res.locals.usersites = usersites.data.result;
            client.post("http://" + req.get('host') + "/api/v1/site.get_all", args, function(sites, response) {
                res.locals.sites = sites.data.result;
                res.locals.user = req.session.user;
                res.render('user', { title: 'Smart Washrooms - User Profile', heading: 'User Profile' });
            });
        });
    });
});

//add the user information to database and goes back to listings
router.post('/user/add', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobileno: req.body.mobileno,
            password: 'Letmein100',
            status: req.body.status,
            role: req.body.role,
            sites: req.body.sites,
            gender: 1,
            createdby: 1
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/user.add", args, function(data, response) {
        res.redirect('/users');
    });
});

router.post('/user/update', function(req, res) {
    // direct way 
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobileno: req.body.mobileno,
            status: req.body.status,
            role: req.body.role,
            sites: req.body.sites,
            gender: 1,
            image: req.body.image
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/user.update", args, function(data, response) {
        res.redirect('/users');
    });
});

//delete the user information to database and goes back to listings
router.post('/user/delete', function(req, res) {

    // direct way 
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: {
            email: req.body.email
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/user.removeByEmail", args, function(data, response) {
        res.redirect('/users');
    });
});
module.exports = router;