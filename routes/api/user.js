var express = require('express');
var users = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');
const uid = require('short-id');
var router = express.Router();

//Signin user
router.post('/v1/user.signin', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    //YYYY-MM-DD HH:MM:SS
    var user = {
        'email': req.body.email,
        'password': req.body.password,
        'lastaccessed': currDateTimeStr
    };

    users.signin(user, function(err, resultUser) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        } else if (resultUser != null) {
            console.info('Info: Sign in - User exists');
            //procede with athuntication attempt
            console.info('Submitted Password: ' + user.password);
            console.info('Saved Password: ' + resultUser.password);
            console.info('Account Status: ' + resultUser.status);
            if (resultUser.status == 1) {
                bcrypt.compare(user.password, resultUser.password, function(err, result) {
                    if (err) {
                        console.error('Error: ' + err);
                        res.jsend.error(err);
                    } else if (result == true) {
                        console.info('Info: User athunticated');
                        res.jsend.success({ result: true, code: 200, message: 'user athunticated' });
                    } else {
                        console.log('Error: password incorrect');
                        res.jsend.fail({ result: false, code: 400, message: 'incorrect password' });
                    }
                });
            } else {
                switch (resultUser.status) {
                    case 2:
                        res.jsend.fail({ result: false, code: 400, message: 'account is currently suspended' });
                        break;
                    case 3:
                        res.jsend.fail({ result: false, code: 400, message: 'account no longer exits' });
                        break;
                    case 4:
                        res.jsend.fail({ result: false, code: 400, message: 'account is currently not active' });
                        break;
                }
            }
        } else {
            console.log('Error: User does not exist');
            res.jsend.fail({ result: false, code: 400, message: 'user does not exist' });
        }
    });
});


//Signout user
router.post('/v1/user.signout', function(req, res, next) {
    req.session.reset();
    res.jsend.success({ result: true, code: 200, message: 'session cleared' });
});

//Delete existing user
router.post('/v1/user.exists', function(req, res, next) {
    var email = req.body.email;
    console.log('email: ' + email);
    users.userExists(req.body.email, function(err, user) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        } else if (user) {
            console.log('User found:' + user.email);
            res.jsend.success({ result: true, code: 200, message: 'user found' });
        } else {
            console.log('no user found');
            res.jsend.fail({ result: false, code: 400, message: 'user not found' });
        }
    });
});

//Get user by username
router.post('/v1/user.get', function(req, res, next) {
    var email = req.body.email;
    console.log('email: ' + email);
    if (email == null) {
        res.jsend.error('invalid email');
    } else {
        users.getByEmail(email, function(err, user) {
            console.log('looking for user: ' + email);
            if (err) {
                console.log('Error: ' + err);
                res.jsend.error(err);
            }
            console.log(user);
            if (user != null) {
                console.log('User found:' + user.email);
                res.jsend.success({ result: user, code: 200, message: 'user found' });
            } else {
                console.log('no user found');
                res.jsend.fail({ result: null, code: 400, message: 'user not found' });
            }
        });
    }
});

//Get user by uuid
router.post('/v1/user.getByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    console.log('uuid: ' + uuid);
    users.getByUUID(uuid, function(err, user) {
        console.log('looking for user: ' + uuid);
        if (err) {
            console.log('Error: ' + err);
            res.jsend.error(err);
        }
        if (user != null) {
            console.log('User found:' + user.email);
            res.jsend.success({ result: user, code: 200, message: 'user found' });
        } else {
            console.log('no user found');
            res.jsend.fail({ result: null, code: 400, message: 'user not found' });
        }
    });
});

// Get users listing
router.post('/v1/user.get_all', function(req, res, next) {
    users.getAll(function(err, userList) {

        if (err) {
            console.log('Error: ' + err);
            res.jsend.error(err);
        }

        if (userList.rowCount > 0) {
            console.log('users:');
            for (var i = 0, len = userList.rowCount; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + userList.rows[i].email);
            }
        }
        res.jsend.success({ result: userList, code: 200, message: 'found user count: ' + userList.length });
    });
});

//Create new user
router.post('/v1/user.add', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    //YYYY-MM-DD HH:MM:SS
    var user = {
        'uuid': 'us' + uid.generate(),
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'email': req.body.email,
        'image': '',
        'mobileno': req.body.mobileno,
        'password': bcrypt.hashSync(req.body.password),
        'status': req.body.status,
        'role': req.body.role,
        'gender': req.body.gender,
        'created': currDateTimeStr,
        'modified': currDateTimeStr,
        'createdby': req.body.createdby,
    };

    users.userExists(req.body.email, function(err, exists) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        } else if (exists != null) {
            console.warn('Warn: User already exists');
            res.jsend.fail({ result: false, code: 400, message: 'user already exist' });
        } else {
            console.log('Info: Creating the user');
            users.create(user, function(err, result) {
                if (err) {
                    console.error('Error: ' + err);
                    res.jsend.error(err);
                } else {

                    if (req.body.sites != null) {
                        //add new memberships
                        console.log(req.body.sites);
                        if (req.body.sites[0].length > 1) {
                            for (i = 0; i < req.body.sites.length; i++) {
                                var userright = {
                                    'useruuid': user.uuid,
                                    'siteuuid': req.body.sites[i]
                                }
                                users.createMembership(userright, function(err, result) {
                                    if (err) {
                                        console.error('Error: ' + err);
                                        res.jsend.error(err);
                                    } else {
                                        console.log('Info: membership updated');
                                    }
                                    return;
                                });
                            }
                        } else {
                            //args
                            var userright = {
                                    'useruuid': user.uuid,
                                    'siteuuid': req.body.sites
                                }
                                //create
                            users.createMembership(userright, function(err, result) {
                                if (err) {
                                    console.error('Error: ' + err);
                                    res.jsend.error(err);
                                } else {
                                    console.log('Info: membership updated');
                                }
                                return;
                            });
                        }
                    }
                }
                console.log('Info: User created');
                res.jsend.success({ result: true, code: 200, message: 'user created' });
            });
        }
    });

});

//Update user
router.post('/v1/user.update', function(req, res, next) {

    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS

    //YYYY-MM-DD HH:MM:SS
    var user = {
        'uuid': req.body.uuid,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'email': req.body.email,
        'mobileno': req.body.mobileno,
        'status': req.body.status,
        'role': req.body.role,
        'gender': req.body.gender,
        'modified': currDateTimeStr,
        'image': req.body.image
    }

    users.userExists(req.body.email, function(err, existingUser) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        } else if (existingUser != null) {
            //user exists now update
            console.log('Info: Updating the user');
            users.update(user, function(err, result) {
                if (err) {
                    console.error('Error: ' + err);
                    res.jsend.error(err);
                } else {
                    //delete old memberships
                    users.deleteMembership(existingUser.uuid, function(err, result) {
                        if (err) {
                            console.error('Error: ' + err);
                            res.jsend.error(err);
                        } else {
                            console.log('Info: old membership deleted');
                            //update new memberships
                            var createResult = true;
                            var createError = '';

                            //if no sites selected then no need to create anything, just return
                            if (req.body.sites == null) {
                                res.jsend.success({ result: true, code: 200, message: 'user updated' });
                                return;
                            }
                            console.log('length= ' + req.body.sites.length);
                            if (req.body.sites[0].length > 1) {
                                for (i = 0; i < req.body.sites.length; i++) {
                                    var userright = {
                                            'useruuid': existingUser.uuid,
                                            'siteuuid': req.body.sites[i]
                                        }
                                        //update
                                    users.createMembership(userright, function(err, result) {
                                        if (err) {
                                            console.error('Error: ' + err);
                                            createResult = false;
                                            createError = err;
                                        } else {
                                            console.log('Info: membership updated');
                                            console.log(userright);
                                            createResult = true;
                                        }
                                    });
                                }
                            } else {
                                //args
                                var userright = {
                                    'useruuid': existingUser.uuid,
                                    'siteuuid': req.body.sites
                                }

                                //update
                                users.createMembership(userright, function(err, result) {
                                    if (err) {
                                        console.error('Error: ' + err);
                                        createResult = false;
                                        createError = err;
                                    } else {
                                        console.log('Info: membership updated');
                                        console.log(userright);
                                        createResult = true;
                                    }
                                });
                            }

                            if (createResult)
                                res.jsend.success({ result: true, code: 200, message: 'user updated' });
                            else
                                res.jsend.error(createError);
                        }
                    });
                }
            });
        } else {
            console.log('Warn: User does not exist');
            res.jsend.fail({ result: false, code: 400, message: 'user not found' });
        }
    });
});


//Update user
router.post('/v1/user.profileupdate', function(req, res, next) {

    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS

    //YYYY-MM-DD HH:MM:SS
    var user = {
        'uuid': req.body.uuid,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'email': req.body.email,
        'mobileno': req.body.mobileno,
        'status': req.body.status,
        'role': req.body.role,
        'gender': req.body.gender,
        'modified': currDateTimeStr,
        'image': req.body.image
    }

    users.userExists(req.body.email, function(err, existingUser) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        } else if (existingUser != null) {
            //user exists now update
            //console.log('Info: updating the user profile');
            users.update(user, function(err, result) {
                if (err) {
                    console.error('Error: ' + err);
                    res.jsend.error(err);
                } else {
                    res.jsend.success({ result: true, code: 200, message: 'profile updated' });
                }
            });
        } else {
            //console.log('Warn: profile does not exist');
            res.jsend.fail({ result: false, code: 400, message: 'profile not found' });
        }
    });
});

//Delete existing user
router.post('/v1/user.removeByEmail', function(req, res, next) {
    users.userExists(req.body.email, function(err, exists) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        } else if (exists != null) {
            //user exists now remove
            console.log('Info: Removing the user');
            users.removeByEmail(req.body.email, function(err, result) {
                if (err) {
                    console.error('Error: ' + err);
                    res.jsend.error(err);
                } else {
                    console.log('Info: User removed');
                    res.jsend.success({ result: true, code: 200, message: 'user found and removed' });
                }
                return;
            });
        } else {
            console.log('Warn: User does not exist');
            res.jsend.fail({ result: false, code: 400, message: 'user not found' });
        }
    });
});

module.exports = router;