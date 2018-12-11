var express = require('express');
var areas = require('../../models/area');
const uid = require('short-id');
var router = express.Router();

// Get area
router.get('/v1/area.get', function(req, res, next) {
    var uuid = req.query.uuid;
    if (uuid == null) {
        res.jsend.error('invalid uuid');
    } else {
        areas.get(uuid, function(err, area) {
            if (err) {
                res.jsend.error(err);
            } else if (area != null) {
                res.jsend.success({ result: area, code: 200, message: 'area found' });
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'no area found' });
            }
        });
    }
});

// Get areas listing - for data grid binding
router.get('/v1/area.get_all', function(req, res, next) {
    areas.getAll(function(err, areaList) {
        if (err) {
            //console.log('Error: ' + err);
            res.status(400);
            res.json({ message: err });
            return;
        }
        if (areaList.length) {
            // console.log('areas:');
            // for (var i = 0, len = areaList.length; i < len; i++) {
            //     console.log('  ' + (i + 1) + '. ' + areaList[i].name);
            // }
            res.json(areaList);
        } else {
            // console.log('no areas');
            res.json('');
        }
    });
});

// Get areas listing
router.post('/v1/area.get_all', function(req, res, next) {
    areas.getAll(function(err, areaList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (areaList.length) {
            console.log('areas:');
            for (var i = 0, len = areaList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + areaList[i].name);
            }
            res.jsend.success({ result: areaList, code: 200, message: 'areas found' });
        } else {
            console.log('no areas');
            res.jsend.fail({ result: [], code: 400, message: 'no areas found' });
        }
    });
});

// Get areas listing

router.post('/v1/area.getByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    if (uuid == null) {
        res.jsend.error('invalid uuid');
    } else {
        areas.getByUUID(uuid, function(err, area) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (area != null) {
                console.log('area found:' + area.name);
                res.jsend.success({ result: area, code: 200, message: 'area found' });
            } else {
                console.log('no area found');
                res.jsend.fail({ result: [], code: 400, message: 'area not found' });
            }
        });
    }
});

// Get areas listing

router.post('/v1/area.getByParrentUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    if (uuid == null) {
        res.jsend.error('invalid uuid');
    } else {
        areas.getByParrentUUID(uuid, function(err, areas) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (areas != null) {
                //  console.log('area found:' + area.name);
                res.jsend.success({ result: areas, code: 200, message: 'area found' });
            } else {
                console.log('no area found');
                res.jsend.fail({ result: [], code: 400, message: 'area not found' });
            }
        });
    }
});

//Add new area to gateway
router.post('/v1/areaGateway.AddToCloud', function(req, res, next) {
    var areauuid = req.body.uuid;
    var areaname = req.body.name;
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else if (areaname == null) {
        res.jsend.error('invalid area name');
    } else {

        device = {
            deviceId: areaname + "-" + areauuid,
            status: 'enabled',
            authentication: {
                symmetricKey: { // <- this is the correct thing (camel-cased)
                    primaryKey: areauuid + areauuid,
                    secondaryKey: areauuid + areauuid
                }
            }
        }
        areas.addToCloud(device, function(err, results) {
            if (err) {
                res.jsend.error(err);
                return;
            }
            if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'gateway added to cloud' });
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'gateway could not be added to cloud' });
            }
        });
    }
});

router.post('/v1/areaGateway.RemoveFromCloud', function(req, res, next) {
    var areauuid = req.body.uuid;
    var areaname = req.body.name;
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else if (areaname == null) {
        res.jsend.error('invalid area name');
    } else {
        areas.removeFromCloud(areaname + "-" + areauuid, function(err, results) {
            if (err) {
                res.jsend.error(err);
                return;
            }
            if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'gateway removed from cloud' });
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'gateway could not be removed from cloud' });
            }
        });
    }
});

//Create new area
router.post('/v1/area.add', function(req, res, next) {
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
    //id, uuid, name, abbr, description, gpslocation, type, status, level, parrentid, enterpriseid, created, modified,
    console.log("*Descscscc");
    console.log(req.body.description);
    var area = {
        'uuid': 'ar' + uid.generate(),
        'name': req.body.name,
        'abbr': req.body.abbr,
        'description': req.body.description,
        'gpslocation': '0',
        'type': req.body.type,
        'status': req.body.status,
        'level': '0',
        'parrentid': req.body.parrentid,
        'enterpriseid': req.body.enterpriseid,
        'created': currDateTimeStr,
        'modified': currDateTimeStr
    };

    console.log(area);
    areas.areaExists(area, function(err, exists) {
        if (err) {
            console.error('Error: ' + err);
            res.status(400);
            res.json({ message: err });
        } else if (exists) {
            console.warn('Warn: Area already exists');
            res.json({ message: 'area already exists' });
        } else {
            console.log('Info: Area does not exist');
            console.log('Info: Creating the area');

            //create gateway device defination
            gatewayDevice = {
                deviceId: area.name + "-" + area.uuid,
                status: 'enabled',
                authentication: {
                    symmetricKey: { // <- this is the correct thing (camel-cased)
                        primaryKey: area.uuid + area.uuid,
                        secondaryKey: area.uuid + area.uuid
                    }
                }
            }
            areas.addToCloud(gatewayDevice, function(err, results) {
                if (err) {
                    res.jsend.error(err);
                    return;
                }
                if (results != null) {
                    //results = gateway device id
                    areas.create(area, function(err, result) {
                        if (err) {
                            console.error('Error: ' + err);
                            res.status(400);
                            res.json({ message: err });
                        } else {
                            console.log('Info: Area created');
                            res.json({ message: 'area created' });
                        }
                        return;
                    });
                } else {
                    res.jsend.fail({ result: [], code: 400, message: 'gateway could not be added to cloud' });
                }
            });
        }
    });

});


//Update area
router.post('/v1/area.update', function(req, res, next) {
    var currDateTime = new Date();
    var currDateTimeStr = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDate() + ' ' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds(); //YYYY-MM-DD HH:MM:SS
    //YYYY-MM-DD HH:MM:SS
    var area = {
        uuid: req.body.uuid,
        name: req.body.name,
        abbr: req.body.abbr,
        type: req.body.type,
        status: req.body.status,
        description: req.body.description,
        parrentid: req.body.parrentid,
        enterpriseid: req.body.enterpriseid,
        modified: currDateTimeStr
    };
    console.log('looking for: ' + area.uuid);
    areas.areaUUIDExists(area, function(err, exists) {
        if (err) {
            console.error('Error: ' + err);
            res.status(400);
            res.json({ message: err });
        } else if (exists) {
            console.log('Info: Updating the area');
            areas.update(area, function(err, result) {
                if (err) {
                    console.error('Error: ' + err);
                    res.status(400);
                    res.json({ message: err });
                } else {
                    console.log('Info: Area updated');
                    res.json({ message: 'area updated' });
                }
                return;
            });
        } else {
            console.log('Warn: Area does not exist');
            res.json({ message: 'area doesnot exists' });
        }
    });
});

//Delete existing area by UUID
router.post('/v1/area.removeByUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    var name = req.body.name;
    console.log('area: ' + uuid);

    areas.removeFromCloud(name + "-" + uuid, function(err, result) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
        } else {
            areas.removeByUUID(uuid, function(err, result) {
                console.log('Info: Removing area ' + uuid);
                if (err) {
                    console.log('Error: ' + err);
                    res.status(400);
                    res.json({ message: err });
                    return;
                }
                console.log('Info: Removed area ' + uuid);
                res.json({ message: 'area removed' });
                return;
            });
        }
    });

});

//Delete existing area by Id
// router.post('/v1/area.removeById', function(req, res, next) {
//     var id = req.body.id;
//     areas.removeById(id, function(err, result) {
//         console.log('Info: Removing area ' + id);
//         if (err) {
//             console.log('Error: ' + err);
//             res.status(400);
//             res.json({ message: err });
//             return;
//         }
//         console.log('Info: Removed area ' + id);
//         res.json({ message: 'area removed' });
//         return;
//     });
// });

//Get areas listing by user id
router.post('/v1/area.getByUserUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    if (uuid == null) {
        res.jsend.error('invalid user uuid');
    } else {
        areas.getAllAreasByUserUUID(uuid, function(err, areaList) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (areaList.length) {
                console.log('areas:');
                for (var i = 0, len = areaList.length; i < len; i++) {
                    console.log('  ' + (i + 1) + '. ' + areaList[i].name);
                }
                res.jsend.success({ result: areaList, code: 200, message: 'areas found' });
            } else {
                console.log('no areas');
                res.jsend.fail({ result: [], code: 400, message: 'no area found' });
            }
        });
    }
});

//Get sites listing
router.get('/v1/site.get_all', function(req, res, next) {
    areas.getAllSites(function(err, areaList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (areaList.length) {
            console.log('sites:');
            for (var i = 0, len = areaList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + areaList[i].name);
            }
            res.json(areaList);
        } else {
            console.log('no sites');
            res.json('');
        }
    });
});

//Get sites listing
router.post('/v1/site.get_all', function(req, res, next) {
    areas.getAllSites(function(err, areaList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (areaList.length) {
            console.log('sites:');
            for (var i = 0, len = areaList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + areaList[i].name);
            }
            res.jsend.success({ result: areaList, code: 200, message: 'sites found' });
        } else {
            console.log('no sites');
            res.jsend.fail({ result: [], code: 400, message: 'no site found' });
        }
    });
});

//Get sites listing by user id
router.post('/v1/site.getByUserUUID', function(req, res, next) {
    var uuid = req.body.uuid;
    if (uuid == null) {
        res.jsend.error('invalid user uuid');
    } else {
        areas.getAllSitesByUserUUID(uuid, function(err, siteList) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (siteList.length) {
                console.log('sites:');
                for (var i = 0, len = siteList.length; i < len; i++) {
                    console.log('  ' + (i + 1) + '. ' + siteList[i].name);
                }
                res.jsend.success({ result: siteList, code: 200, message: 'sites found' });
            } else {
                console.log('no sites');
                res.jsend.fail({ result: [], code: 400, message: 'no site found' });
            }
        });
    }
});

//Get sites listing
router.get('/v1/site.getByEnterpriseId', function(req, res, next) {
    var enterpriseId = req.body.enterpriseId;
    areas.getByEnterpriseId(enterpriseId, function(err, areaList) {
        if (err) {
            console.error('Error: ' + err);
            res.jsend.error(err);
            return;
        }
        if (areaList.length) {
            console.log('sites:');
            for (var i = 0, len = areaList.length; i < len; i++) {
                console.log('  ' + (i + 1) + '. ' + areaList[i].name);
            }
            res.jsend.success({ result: areaList, code: 200, message: 'sites found' });
        } else {
            console.log('no sites');
            res.jsend.fail({ result: [], code: 400, message: 'no site found' });
        }
    });
});

module.exports = router;