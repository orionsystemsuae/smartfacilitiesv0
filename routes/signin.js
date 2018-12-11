var express = require('express');
var router = express.Router();

router.get('/signin', function(req, res) {
    //if already valid session the go straight to home
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
        res.render('index', { title: 'Smart Washrooms - Home', heading: 'Home' });
    } else
    //else go to signin page
        res.render('signin', { title: 'Smart Washrooms - Sign In', error: null });
});

router.post('/signin', function(req, res) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    var errorList = [];
    // validate the input - depricated
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();
    // check the validation object for errors
    var errors = req.validationErrors();
    //res.json(errors);
    //console.log(errors);
    for (var i = 0; i < errors.length; i++) {
        if (errors[i].msg != null)
            errorList.push(errors[i].msg);
    }
    //if no client side errors then try to authenticate user from database
    if (errorList.length == 0) {
        var args = {
            data: {
                'email': req.body.email,
                'password': req.body.password
            },
            headers: { "Content-Type": "application/json" }
        };
        // direct way 
        var Client = require('node-rest-client').Client;
        var client = new Client();
        console.log(req.get('host'));
        client.post("http://" + req.get('host') + "/api/v1/user.signin", args, function(request, response) {
            if (request == null) {
                errorList.push('Invalid email or password');
                res.render('signin', { title: 'Smart Washrooms - Sign In', error: errorList });
                return;
            } else if (request.status == 'fail') {
                errorList.push(request.data.message.replace(/^[a-z]/, function(x) { return x.toUpperCase() }) + '.');
                res.render('signin', { title: 'Smart Washrooms - Sign In', error: errorList });
                return;
            } else {
                if (request.status == 'success') {
                    // req.session.email = req.body.email;
                    var args = {
                        data: { email: req.body.email },
                        headers: { "Content-Type": "application/json" }
                    };
                    // direct way 
                    var Client = require('node-rest-client').Client;
                    var client = new Client();
                    client.post("http://" + req.get('host') + "/api/v1/user.get", args, function(user, response) {
                        if (user != null) {
                            if (user.status == "success") {
                                var args = {
                                    data: { uuid: user.data.result.uuid },
                                    headers: { "Content-Type": "application/json" }
                                };
                                delete user.data.result.created;
                                delete user.data.result.modified;
                                delete user.data.result.status;
                                delete user.data.result.gender;
                                delete user.data.result.gender;
                                delete user.data.result.image;

                                client.post("http://" + req.get('host') + "/api/v1/site.getByUserUUID", args, function(sites, response) {
                                    var usersites = [];
                                    console.log('Sites *************');

                                    //  console.log(args);
                                    //  console.log(sites.data.result[0]);

                                    if (sites != null) {
                                        for (i = 0; i < sites.data.result.length; i++) {
                                            //   usersites.push({ name: sites.data.result[i].name, id: sites.data.result[i].id, uuid: sites.data.result[i].uuid })
                                            delete sites.data.result[i].description;
                                            delete sites.data.result[i].level;
                                            delete sites.data.result[i].status;
                                            delete sites.data.result[i].timezone;
                                            delete sites.data.result[i].abbr;
                                            delete sites.data.result[i].gpslocation;
                                            delete sites.data.result[i].type;
                                            delete sites.data.result[i].created;
                                            delete sites.data.result[i].modified;
                                            delete sites.data.result[i].enterprise;
                                            delete sites.data.result[i].enterpriseid;
                                        }
                                        user.data.result['sites'] = sites.data.result;
                                        //user.data.result['sites'] = usersites;
                                    }

                                    client.post("http://" + req.get('host') + "/api/v1/area.getByUserUUID", args, function(areas, response) {
                                        var userareas = [];
                                        if (areas != null) {
                                            for (i = 0; i < areas.data.result.length; i++) {
                                                delete areas.data.result[i].description;
                                                delete areas.data.result[i].status;
                                                delete areas.data.result[i].timezone;
                                                delete areas.data.result[i].level;
                                                delete areas.data.result[i].abbr;
                                                delete areas.data.result[i].gpslocation;
                                                delete areas.data.result[i].type;
                                                delete areas.data.result[i].created;
                                                delete areas.data.result[i].modified;
                                                delete areas.data.result[i].enterprise;
                                                delete areas.data.result[i].enterpriseid;
                                                userareas.push({ name: areas.data.result[i].name, parrentid: areas.data.result[i].parrentid, uuid: areas.data.result[i].uuid });
                                            }
                                            //user.data.result['areas'] = areas.data.result;
                                            user.data.result['areas'] = areas.data.result;
                                        }

                                        res.locals.data = user.data.result;
                                        res.locals.user = user.data.result;
                                        req.session.user = user.data.result;
                                        console.log('************* User');
                                        console.log(res.locals.user);
                                        //console.log('************* Areas');
                                        //console.log(user.data.result['areas']);
                                        res.render('index', { title: 'Smart Washrooms - Home', heading: 'Home' });
                                        return;
                                    });
                                });
                            }
                        }
                    });
                } else {
                    errorList.push('Invalid email or password');
                    res.render('signin', { title: 'Smart Washrooms - Sign In', error: errorList });
                    return;
                }
            }
        });
    } else {
        res.render('signin', { title: 'Smart Washrooms - Sign In', error: errorList });
        return;
    }
});

module.exports = router;