var express = require('express');
var router = express.Router();

router.get('/signup', function(req, res) {
    res.render('signup', { auth: 0, title: 'Smart Washrooms - Sign Up' });
});


router.post('/signup', function(req, res, next) {

    // validate the input
    // req.checkBody('username', 'Email is required').notEmpty();
    // req.checkBody('username', 'Email does not appear to be valid').isEmail();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Repeat password is required').notEmpty();
    // req.checkBody('password', 'Both passwords donot match').isEqual(req.body.password2);

    // check the validation object for errors
    // var errors = req.validationErrors();
    // console.log(errors);

    // if (errors) {
    //     res.render('signup', { title: 'Smart Washrooms - Sign Up', heading: 'Sign Up' });
    // } else
    {

        //if no client side errors then try to add user to database
        // direct way 
        var Client = require('node-rest-client').Client;
        var client = new Client();
        var args = {
            data: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                mobileno: req.body.mobileno,
                password: req.body.password,
                status: 4,
                role: 3,
                gender: 1, //req.body.gender,
                createdby: 2
            },
            headers: { "Content-Type": "application/json" }
        };

        client.post("http://" + req.get('host') + "/api/v1/user.add", args, function(data, response) {
            // parsed response body as js object 
            //console.log(data);
            // raw response 
            //console.log(response);
            res.locals.data = data;

            res.redirect('/message');
        });
    }
});

module.exports = router;