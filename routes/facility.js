var express = require('express');
var router = express.Router();


//gives a blank web form
router.get('/facility', function(req, res, next) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    res.locals.data = null; // New Facility so this field is null    
    client.post("http://" + req.get('host') + "/api/v1/area.get_all", function(areas, response) {
        res.locals.areas = areas.data.result;;
        client.post("http://" + req.get('host') + "/api/v1/facilityType.get_all", function(types, response) {
            res.locals.types = types.data.result;
            client.post("http://" + req.get('host') + "/api/v1/deviceType.get_all", function(devicetypes, response) {
                res.locals.devicetypes = devicetypes.data.result;
                res.locals.user = req.session.user;
                res.render('facility', { title: 'Smart Washrooms - Facility Profile', heading: 'Facility Profile' });
            });
        });
    });
});

//gets the user information and shows on the form
router.get('/facility/:uuid', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        data: { uuid: req.params.uuid },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://" + req.get('host') + "/api/v1/facility.getByUUID", args, function(facility, response) {
        res.locals.data = facility.data.result;
        client.post("http://" + req.get('host') + "/api/v1/area.get_all", function(areas, response) {
            res.locals.areas = areas.data.result;
            client.post("http://" + req.get('host') + "/api/v1/facilityType.get_all", function(types, response) {
                res.locals.types = types.data.result;
                client.post("http://" + req.get('host') + "/api/v1/deviceType.get_all", function(devicetypes, response) {
                    res.locals.devicetypes = devicetypes.data.result;
                    args = {
                        data: { facilityid: facility.data.result.id },
                        headers: { "Content-Type": "application/json" }
                    };
                    console.log('test3');
                    console.log(args);
                    client.post("http://" + req.get('host') + "/api/v1/device.getByFacilityId", args, function(devices, response) {
                        res.locals.devices = devices.data.result;
                        res.locals.user = req.session.user;
                        res.render('facility', { title: 'Smart Washrooms - Facility Profile', heading: 'Facility Profile' });
                    });
                });
            });
        });
    });
});



//add the user information to database and goes back to listings
router.post('/facility/add', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // direct way 
    var args = {
        data: {
            uuid: req.body.uuid,
            name: req.body.name,
            status: req.body.status,
            description: req.body.description,
            areaid: JSON.parse(req.body.areaid).value,
            type: JSON.parse(req.body.type).value,
            devices: req.body.devices
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/facility.add", args, function(data, response) {
        res.redirect('/facilities');
    });
});

router.post('/facility/update', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    // console.log('Debug1:' + req.body.type);
    console.log('Debug2:' + req.body.devices);
    console.log('Debug2:' + req.body.devices);
    console.log('Debug2:' + req.body.devices);
    console.log('Debug2:' + req.body.devices);

    var args = {
        data: {
            uuid: req.body.uuid,
            name: req.body.name,
            status: req.body.status,
            description: req.body.description,
            areaid: JSON.parse(req.body.areaid).value,
            type: JSON.parse(req.body.type).value,
            devices: req.body.devices
        },
        headers: { "Content-Type": "application/json" }
    };
    console.log('Debug3:' + args.data.devices);
    client.post("http://" + req.get('host') + "/api/v1/facility.update", args, function(data, response) {
        res.redirect('/facilities');
    });
});


//delete the user information to database and goes back to listings
router.post('/facility/delete', function(req, res) {
    var Client = require('node-rest-client').Client;
    var client = new Client();

    // direct way 
    var args = {
        data: {
            uuid: req.body.uuid
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://" + req.get('host') + "/api/v1/facility.removeByUUID", args, function(data, response) {
        res.redirect('/facilities');
    });
});
module.exports = router;