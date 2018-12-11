var express = require('express');
var router = express.Router();

//get all users
router.get('/users', function(req, res) {
    console.log("******************** HELLO *****************");
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    client.post("http://" + req.get('host') + "/api/v1/user.get_all", function(users, response) {
        if (users != null) {
            if (users.status == "success") {
                res.locals.data = users.data.result;
                res.locals.user = req.session.user;
                res.render('users', { title: 'Smart Washrooms - Users', heading: 'User Management' });
            }
        }
    });
});

//delete the user information to database and goes back to listings
router.get('/users/delete/:email', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var args = {
        data: { email: req.body.email },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/user.removeByEmail", args, function(data, response) {
        res.redirect('/users');
    });
});

module.exports = router;