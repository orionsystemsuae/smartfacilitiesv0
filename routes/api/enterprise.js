var express = require('express');
var enterprises = require('../../models/enterprise');
const uid = require('short-id');
var router = express.Router();

// Get areas listing
router.get('/v1/enterprise.get_all', function(req, res, next) {
    enterprises.getAll(function(err, enterpriseList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        }
        if (enterpriseList.length) {
            console.log('enterprises:');
            for (var i = 0, len = enterpriseList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + enterpriseList[i].name);
            }
            res.json(enterpriseList);
        } else {
            console.log('no enterprises');
            res.json('');
        }
    });
});

// Get areas listing
router.post('/v1/enterprise.get_all', function(req, res, next) {
    enterprises.getAll(function(err, enterpriseList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (enterpriseList.length) {
            console.log('enterprises:');
            for (var i = 0, len = enterpriseList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + enterpriseList[i].name);
            }
            res.jsend.success({ result: enterpriseList, code: 200, message: 'enterprises found' });
        } else {
            console.log('no enterprises');
            res.jsend.fail({ result: [], code: 400, message: 'enterprise not found' });
        }
    });
});

// Get enterprise by uuid
router.post('/v1/enterprise.getByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    enterprises.getByUUID(uuid, function(err, enterprise) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (enterprise != null) {
            console.log('enterprise found:' + enterprise.name);
            res.jsend.success({ result: enterprise, code: 200, message: 'enterprises found' });
        } else {
            console.log('no enterprise found');
            res.jsend.fail({ result: [], code: 400, message: 'enterprise not found' });
        }
    });
});

// Get enterprise by uuid
router.get('/v1/enterprise.getById', function(req, res, next) {
    var id = req.body.id;
    console.log('id: ' + id);
    enterprises.getById(id, function(err, enterprise) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (enterprise != null) {
            console.log('enterprise found:' + enterprise.name);
            res.jsend.success({ result: enterprise, code: 200, message: 'enterprises found' });
        } else {
            console.log('no enterprise found');
            res.jsend.fail({ result: [], code: 400, message: 'enterprise not found' });
        }
    });
});

//Create new area
router.post('/v1/enterprise.add', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    uid.configure({
        length: 10, // The length of the id strings to generate 
        algorithm: 'sha1', // The hashing algoritm to use in generating keys 
        salt: Math.random // A salt value or function 
    });
    var enterprise = {
        'uuid': 'en' + uid.generate(),
        'name': req.body.name,
        'abbr': req.body.abbr,
        'description': req.body.description,
        'status': 1,
        'created': currDateTimeStr,
        'modified': currDateTimeStr,
        'createdby': 1
    };
    enterprises.enterpriseExists(enterprise, function(err, exists) {
        if (err) {
            console.error('Error: ' + err);
            res.status(400);
            res.json({ message: err });
        } else if (exists) {
            console.warn('Warn: Enterprise already exists');
            res.json({ message: 'enterprise already exists' });
        } else {
            console.log('Info: Enterprise does not exist');
            console.log('Info: Creating the enterprise');
            enterprises.create(enterprise, function(err, result) {
                if (err) {
                    console.error('Error: ' + err);
                    res.status(400);
                    res.json({ message: err });
                } else {
                    console.log('Info: Enterprise created');
                    res.json({ message: 'enterprise created' });
                }
                return;
            });
        }
    });
});

//Update area
router.post('/v1/enterprise.update', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    //YYYY-MM-DD HH:MM:SS
    var enterprise = {
        // 'id': req.body.id,
        'uuid': req.body.uuid,
        'name': req.body.name,
        'abbr': req.body.abbr,
        'description': req.body.description,
        'status': req.body.status,
        'modified': currDateTimeStr
    };
    console.log(enterprise);
    enterprises.enterpriseUUIDExists(enterprise, function(err, exists) {
        if (err) {
            console.error('Error1: ' + err);
            res.status(400);
            res.json({ message: err });
        } else if (exists) {
            console.log('Info: Updating the enterprise');
            enterprises.update(enterprise, function(err, result) {
                if (err) {
                    console.error('Error2: ' + err);
                    res.status(400);
                    res.json({ message: err });
                } else {
                    console.log('Info: Enterprise updated');
                    res.json({ message: 'enterprise updated' });
                }
                return;
            });
        } else {
            console.log('Warn: Enterprise does not exist');
            res.json({ message: 'enterprise doesnot exists' });
        }
    });
});


//Delete existing area by uuid
router.post('/v1/enterprise.removeByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    enterprises.removeByUUID(uuid, function(err, result) {
        console.log('Info: Removing enterprise ' + uuid);
        if (err) {
            console.log('Error: ' + err);
            res.status(400);
            res.json({ message: err });
            return;
        }
        console.log('Info: Removed enterprise ' + uuid);
        res.json({ message: 'enterprise removed' });
        return;
    });
});

//Delete existing enterprise by Id
router.post('/v1/enterprise.removeById', function(req, res, next) {
    var id = req.body.id;
    enterprises.removeById(id, function(err, result) {
        console.log('Info: Removing enterprise ' + id);
        if (err) {
            console.log('Error: ' + err);
            res.status(400);
            res.json({ message: err });
            return;
        }
        console.log('Info: Removed enterprise ' + id);
        res.json({ message: 'enterprise removed' });
        return;
    });
});
module.exports = router;