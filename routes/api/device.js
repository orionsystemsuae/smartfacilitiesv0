var express = require('express');
var devices = require('../../models/device');
const uid = require('short-id');
var router = express.Router();

// Get devices listing - for data grid binding
router.get('/v1/device.get_all', function(req, res, next) {
    devices.getAll(function(err, deviceList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (deviceList.length) {
            console.log('devices:');
            for (var i = 0, len = deviceList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + deviceList[i].name);
            }
            res.jsend.success({ result: deviceList, code: 200, message: 'devices found' });
        } else {
            console.log('no devices');
            res.jsend.fail({ result: [], code: 400, message: 'no devices found' });
        }
    });
});

// Get devices listing
router.post('/v1/device.get_all', function(req, res, next) {
    devices.getAll(function(err, deviceList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (deviceList.length) {
            console.log('devices:');
            for (var i = 0, len = deviceList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + deviceList[i].name);
            }
            res.jsend.success({ result: deviceList, code: 200, message: 'devices found' });
        } else {
            console.log('no devices');
            res.jsend.fail({ result: [], code: 400, message: 'no devices found' });
        }
    });
});

// Get device by uuid
router.post('/v1/device.getByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    if (uuid == null) {
        res.jsend.error('invalid uuid');
    } else {
        devices.getByUUID(uuid, function(err, device) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (device != null) {
                console.log('device found:' + device.name);
                res.jsend.success({ result: device, code: 200, message: 'device found' });
            } else {
                console.log('no device found');
                res.jsend.fail({ result: [], code: 400, message: 'no device found' });
            }
        });
    }
});

// Get device by facility id
router.post('/v1/device.getByFacilityId', function(req, res, next) {
    var facilityId = req.body.facilityid;
    console.log("facility id= " + facilityId);
    if (facilityId == null) {
        res.jsend.error('invalid facility Id');
    } else {
        devices.getByFacilityId(facilityId, function(err, devices) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (devices != null) {
                //console.log('device found:' + device.name);
                res.jsend.success({ result: devices, code: 200, message: 'devices found' });
            } else {
                console.log('no device found');
                res.jsend.fail({ result: [], code: 400, message: 'no device found' });
            }
        });
    }
});

// Get device by facility uuid
router.post('/v1/device.getByFacilityUUID', function(req, res, next) {
    var facilityuuid = req.body.facilityuuid;
    console.log("facility uuid= " + facilityuuid);
    if (facilityuuid == null) {
        res.jsend.error('invalid facility uuid');
    } else {
        devices.getByFacilityUUID(facilityuuid, function(err, devices) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (devices != null) {
                //console.log('device found:' + device.name);
                res.jsend.success({ result: devices, code: 200, message: 'devices found' });
            } else {
                console.log('no device found');
                res.jsend.fail({ result: [], code: 400, message: 'no device found' });
            }
        });
    }
});

// Get device by area uuid
router.post('/v1/device.getByAreaUUID', function(req, res, next) {
    var areauuid = req.body.uuid;
    console.log("area uuid= " + areauuid);
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else {
        devices.getByAreaUUID(areauuid, function(err, devices) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (devices != null) {
                //console.log('device found:' + device.name);
                res.jsend.success({ result: devices, code: 200, message: 'devices found' });
            } else {
                console.log('no device found');
                res.jsend.fail({ result: [], code: 400, message: 'no device found' });
            }
        });
    }
});

//Create new device
router.post('/v1/device.add', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    //console.log('date: ' + currDateTimeStr);
    //YYYY-MM-DD HH:MM:SS
    //configure random id
    uid.configure({
        length: 10, // The length of the id strings to generate 
        algorithm: 'sha1', // The hashing algoritm to use in generating keys 
        salt: Math.random // A salt value or function 
    });

    var device = {
        uuid: req.body.typecode.toLowerCase() + uid.generate(),
        name: req.body.name,
        status: req.body.status,
        key: '',
        description: req.body.description,
        facilityid: req.body.facilityid,
        facilityuuid: req.body.facilityuuid,
        type: req.body.type,
        created: currDateTimeStr,
        modified: currDateTimeStr
    };

    if (req.body.typecode == null) {
        res.jsend.error('invalid device typecode');
    } else if (req.body.type == null) {
        res.jsend.error('invalid device type');
    } else if (req.body.status == null) {
        res.jsend.error('invalid device status');
    } else if (req.body.name == null) {
        res.jsend.error('invalid device name');
    } else if (req.body.name.length == 0) {
        res.jsend.error('invalid device name');
    } else if (req.body.facilityid == null) {
        res.jsend.error('invalid facility id');
    } else if (req.body.facilityuuid == null) {
        res.jsend.error('invalid facility uuid');
    } else {
        devices.deviceExists(device, function(err, exists) {
            if (err) {
                console.log("device exists");
                console.error('Error: ' + err);
                res.jsend.error(err);
            } else if (exists) {
                console.warn('Warn: Device already exists');
                res.jsend.fail({ result: -1, code: 400, message: 'device already exists' });
            } else {
                console.log("creating device");
                //create device
                devices.create(device, function(err, result) {
                    if (err) {
                        console.error('Error: ' + err);
                        res.jsend.error(err);
                    } else {
                        res.jsend.success({ result: result, code: 200, message: 'device added' });
                    }
                    return;
                });

            }
        });
    }
});


//Update device
router.post('/v1/device.update', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    //YYYY-MM-DD HH:MM:SS
    var device = {
        uuid: req.body.uuid,
        name: req.body.name,
        status: req.body.status,
        description: req.body.description,
        facilityid: req.body.facilityid,
        type: req.body.type,
        created: currDateTimeStr,
        modified: currDateTimeStr
    };

    if (uuid == null) {
        res.jsend.error('invalid device uuid');
    } else if (type == null) {
        res.jsend.error('invalid device type');
    } else if (status == null) {
        res.jsend.error('invalid device status');
    } else if (name == null) {
        res.jsend.error('invalid device name');
    } else if (name.length == 0) {
        res.jsend.error('invalid device name');
    } else if (facilityid == null) {
        res.jsend.error('invalid facility id');
    } else {
        devices.deviceUUIDExists(device, function(err, exists) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
            } else if (exists) {
                console.log('Info: Updating the device');
                devices.update(device, function(err, result) {
                    if (err) {
                        console.error('Error: ' + err);
                        res.jsend.error(err);
                    } else {
                        console.log('Info: device updated');
                        res.jsend.success({ result: result, code: 200, message: 'device updated' });
                    }
                    return;
                });
            } else {
                console.log('Warn: device does not exist');
                res.jsend.fail({ result: -1, code: 400, message: 'device doesnot exists' });
            }
        });
    }
});

//Delete existing device by UUID
router.post('/v1/device.removeByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    if (uuid == null) {
        res.jsend.error('invalid uuid');
    } else {
        devices.removeByUUID(uuid, function(err, result) {
            console.log('Info: Removing device ' + uuid);
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            console.log('Info: Removed device ' + uuid);
            res.jsend.success({ result: true, code: 200, message: 'device removed' });
            return;
        });
    }
});

//Get sites listing
router.post('/v1/deviceType.get_all', function(req, res, next) {
    devices.getAllTypes(function(err, deviceTypeList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (deviceTypeList.length) {
            console.log('device type:');
            for (var i = 0, len = deviceTypeList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + deviceTypeList[i].name);
            }
            var data = deviceTypeList;
            res.jsend.success({ result: deviceTypeList, code: 200, message: 'device types found' });
        } else {
            console.log('no device types found');
            res.jsend.fail({ result: deviceTypeList, code: 400, message: 'no device types found' });
        }
    });
});

module.exports = router;