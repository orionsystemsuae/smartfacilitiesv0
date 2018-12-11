var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var path = require("path");
//gets the user information and shows on the form
router.get('/profile', function(req, res) {
    var args = {
        data: { uuid: req.query.uuid },
        headers: { "Content-Type": "application/json" }
    };
    console.log('***********');
    console.log(req.params.uuid);
    var Client = require('node-rest-client').Client;
    var client = new Client();
    client.post("http://" + req.get('host') + "/api/v1/user.getByUUID", args, function(user, response) {
        res.locals.data = user.data.result;
        client.post("http://" + req.get('host') + "/api/v1/site.getByUserUUID", args, function(usersites, response) {
            res.locals.usersites = usersites.data.result;
            client.post("http://" + req.get('host') + "/api/v1/site.get_all", args, function(sites, response) {
                res.locals.sites = sites.data.result;
                res.locals.user = req.session.user;
                res.render('profile', { title: 'Smart Washrooms - My Profile', heading: 'My Profile' });
            });
        });
        // if (user != null) {
        //     if (user.status == "success") {
        //         res.locals.data = user.data.result;
        //         res.locals.user = req.session.user;
        //         res.render('profile', { title: 'Smart Washrooms - User Profile', heading: 'User Profile', user: req.session.user });
        //     }
        // } else
        //     res.sendStatus(400);
    });
});

router.post('/profile/update/:uuid', function(req, res) {

    // direct way 
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: {
            uuid: req.params.uuid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobileno: req.body.mobileno,
            status: req.body.status,
            role: req.body.role,
            gender: 1,
            image: req.body.image
        },
        headers: { "Content-Type": "application/json" }
    };
    console.log('********************');
    console.log(args.data);
    client.post("http://" + req.get('host') + "/api/v1/user.profileupdate", args, function(data, response) {
        res.redirect('/profile?uuid=' + req.params.uuid);
    });
});

router.post('/profile/image_upload', function(req, res) {

    var imageDir = path.resolve("./public/img/users");
    var fileName = req.body.useruuid + "." + req.body.extension;
    var data_url = req.body.file;
    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
    var ext = matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');
    fs.outputFile(path.join(imageDir, fileName), buffer,
        function(err) {
            if (err) {
                return console.log(err);
            }
            res.send('success');
        });
});

module.exports = router;