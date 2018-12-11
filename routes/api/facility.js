var express = require('express');
var facilities = require('../../models/facility');
var devices = require('../../models/device');
const uid = require('short-id');
var router = express.Router();

// Get facilitys listing - for data grid binding
router.get('/v1/facility.get_all', function(req, res, next) {
    facilities.getAll(function(err, facilityList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (facilityList.length) {
            console.log('facilities:');
            for (var i = 0, len = facilityList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + facilityList[i].name);
            }
            // res.jsend.success({ result: facilityList, code: 200, message: 'facilities found' });
            res.send(facilityList);
        } else {
            console.log('no facilities');
            res.send('');
        }
    });
});

// Get facilitys listing
router.post('/v1/facility.get_all', function(req, res, next) {
    facilities.getAll(function(err, facilityList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (facilityList.length) {
            console.log('facilities:');
            for (var i = 0, len = facilityList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + facilityList[i].name);
            }
            res.jsend.success({ result: facilityList, code: 200, message: 'facilities found' });
        } else {
            console.log('no facilities');
            res.jsend.fail({ result: [], code: 400, message: 'no facility found' });
        }
    });
});

// Get enterprise by uuid
router.post('/v1/facility.getByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    console.log('uuid: ' + uuid);
    if (uuid == null) {
        res.jsend.error('invalid uuid');
    } else {
        facilities.getByUUID(uuid, function(err, facility) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (facility != null) {
                console.log('Facility found:' + facility.name);
                res.jsend.success({ result: facility, code: 200, message: 'facility found' });
            } else {
                console.log('no facility found');
                res.jsend.fail({ result: -1, code: 400, message: 'no facility found' });
            }
        });
    }
});

//Create new facility
router.post('/v1/facility.add', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    //YYYY-MM-DD HH:MM:SS
    //configure random id
    uid.configure({
        length: 10, // The length of the id strings to generate 
        algorithm: 'sha1', // The hashing algoritm to use in generating keys 
        salt: Math.random // A salt value or function 
    });

    var facility = {
        uuid: 'fc' + uid.generate(),
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        status: req.body.status,
        areaid: req.body.areaid,
        created: currDateTimeStr,
        modified: currDateTimeStr
    };
    facility.description = (facility.description.length > 0 ? facility.description : ' ');
    console.log(facility);
    facilities.facilityExists(facility, function(err, exists) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        } else if (exists) {
            console.log('Error: Facility already exists');
            res.jsend.fail({ result: -1, code: 400, message: 'facility already exists' });
        } else {
            console.log('creating facility: ' + facility.name);
            facilities.create(facility, function(err, result) {
                if (err) {
                    console.error('Error: ' + err);
                    res.jsend.error(err);
                    return;
                } else {
                    if (result) {
                        var facilityId = result;
                        console.log('Info: Facility created = ' + facility.uuid);
                        //now add devices for this facility

                        var deviceTypes = req.body.devices;
                        for (j = 0; j < deviceTypes.length; j++)
                            console.log("DEVICE: " + deviceTypes[j]);
                        console.log("Device Types: " + deviceTypes.toString());
                        devices.getTypesByCodes(deviceTypes.toString(), function(err, result) {
                            for (j = 0; j < result.length; j++) {
                                console.log("Name: " + result[j].name);
                                var device = {
                                    uuid: result[j].code.toLowerCase() + uid.generate(),
                                    name: facility.name + '/' + result[j].code.toUpperCase(),
                                    description: result[j].name,
                                    type: result[j].id,
                                    status: 1,
                                    key: '123',
                                    facilityuuid: facility.uuid,
                                    facilityid: facilityId,
                                    created: currDateTimeStr,
                                    modified: currDateTimeStr
                                };
                                //create device
                                devices.create(device, function(err, result) {
                                    if (err) {
                                        console.error('Error: ' + err);
                                        res.jsend.error(err);
                                        return;
                                    } else {
                                        if (result) {
                                            console.log('Info: device created = ' + result);
                                        }
                                    }
                                });
                            }
                        });

                        res.jsend.success({ result: result, code: 200, message: 'facility created' });
                    }
                }
                return;
            });
        }
    });
});


//Update facility
router.post('/v1/facility.update', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    //YYYY-MM-DD HH:MM:SS
    var facility = {
        uuid: req.body.uuid,
        name: req.body.name,
        status: req.body.status,
        description: req.body.description,
        areaid: req.body.areaid,
        type: req.body.type,
        modified: currDateTimeStr
    };

    var deviceTypes = req.body.devices;
    facilities.facilityUUIDExists(facility, function(err, exists) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        } else if (exists) {
            console.log('Info: Updating the facility');
            facilities.update(facility, function(err, result) {
                if (err) {
                    console.error('Error: ' + err);
                    res.jsend.error(err);
                } else {

                    console.log('Info: facility updated');
                    console.log('RESULT: ' + result);
                    res.jsend.success({ result: result, code: 200, message: 'facility updated' });
                }
                return;
            });
        } else {
            console.log('Warn: facility does not exist');
            res.jsend.fail({ result: result, code: 400, message: 'facility does not exist' });
        }
    });
});

//Delete existing facility by UUID
router.post('/v1/facility.removeByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    facilities.removeByUUID(uuid, function(err, result) {
        console.log('Info: Removing facility ' + uuid);
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        console.log('Info: Removed facility ' + uuid);
        res.jsend.success({ result: true, code: 200, message: 'facility removed' });
        return;
    });
});

//Get sites listing
router.post('/v1/facilityType.get_all', function(req, res, next) {
    facilities.getAllTypes(function(err, facilityTypeList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (facilityTypeList.length) {
            console.log('facilities type:');
            for (var i = 0, len = facilityTypeList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + facilityTypeList[i].name);
            }
            res.jsend.success({ result: facilityTypeList, code: 200, message: 'no facility types found' });
        } else {
            console.log('no facility types found');
            res.jsend.fail({ result: [], code: 400, message: 'no facility types found' });
        }
    });
});

//Get facilities by area id
router.get('/v1/facility.getByAreaUuid', function(req, res, next) {
    var areauuid = req.query.areauuid;
    facilities.getByAreaUuid(areauuid, function(err, results) {
        if (err) {
            res.jsend.error(err);
            return;
        }
        if (results.length) {         
            res.jsend.success({ result: results, code: 200, message: 'results found' });
        } else {
            res.jsend.fail({ result: [], code: 400, message: 'no results found' });
        }
    });
});
module.exports = router;