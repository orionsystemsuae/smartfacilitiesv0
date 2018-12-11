var express = require('express');
var signage = require('../../models/signage');
const uid = require('short-id');
var router = express.Router();

// Get cubical avilability summary
router.get('/v1/signage/cubicalsAvilability.getCurrentSummary', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetCubicalsAvilableNowSummary(areauuid, startdate, enddate, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: JSON.parse('{"name": "cubical", "total": 10, "used": 10, "usedperc": 100, "free": 0, "freeperc": 0}'), code: 200, message: 'summary recieved' });
                // res.jsend.success({
                //     result: JSON.parse('{"name": "cubical", "total": 10, }'),
                //     code: 200,
                //     message: 'summary recieved'
                // });
            } else {
                console.log('summary not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'summary not recieved' });
            }
        });
});

// Get cubical avilability detail
router.get('/v1/signage/cubicalsAvilability.getCurrentDetail', function(req, res, next) {
    var areauuid = req.query.areauuid;
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetCubicalsAvilableNowDetail(areauuid, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'detail recieved' });
            } else {
                console.log('detail not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'detail not recieved' });
            }
        });
});

// Get washbasin avilability summary
router.get('/v1/signage/washbasinsAvilability.getCurrentSummary', function(req, res, next) {
    var areauuid = req.query.areauuid;
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetWashbasinsAvilableNowSummary(areauuid, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'summary recieved' });
            } else {
                console.log('summary not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'summary not recieved' });
            }
        });
});

// Get washbasin avilability detail
router.get('/v1/signage/washbasinsAvilability.getCurrentDetail', function(req, res, next) {
    var areauuid = req.query.areauuid;
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetWashbasinsAvilableNowDetail(areauuid, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'detail recieved' });
            } else {
                console.log('detail not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'detail not recieved' });
            }
        });
});

// Get urinals avilability summary
router.get('/v1/signage/urinalsAvilability.getCurrentSummary', function(req, res, next) {
    var areauuid = req.query.areauuid;
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetUrinalsAvilableNowSummary(areauuid, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'summary recieved' });
            } else {
                console.log('summary not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'summary not recieved' });
            }
        });
});

// Get urinals avilability detail
router.get('/v1/signage/urinalsAvilability.getCurrentDetail', function(req, res, next) {
    var areauuid = req.query.areauuid;
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetUrinalsAvilableNowDetail(areauuid, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'detail recieved' });
            } else {
                console.log('detail not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'detail not recieved' });
            }
        });
});

// Get footwashs avilability summary
router.get('/v1/signage/footwashsAvilability.getCurrentSummary', function(req, res, next) {
    var areauuid = req.query.areauuid;
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetFootWashsAvilableNowSummary(areauuid, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'summary recieved' });
            } else {
                console.log('summary not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'summary not recieved' });
            }
        });
});

// Get footwashs avilability detail
router.get('/v1/signage/footwashsAvilability.getCurrentDetail', function(req, res, next) {
    var areauuid = req.query.areauuid;
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetFootWashsAvilableNowDetail(areauuid, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'detail recieved' });
            } else {
                console.log('detail not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'detail not recieved' });
            }
        });
});

// Get washbasins usage stats summary
router.get('/v1/signage/washbasinsUsageStats.getCurrentSummary', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    var eventsize = req.query.eventsize;
    if(eventsize == null )
        eventsize = 0;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString();
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetWashbasinsUsageStatsSummary(areauuid, startdate, enddate, eventsize, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'data recieved' });
            } else {
                console.log('detail not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'data not recieved' });
            }
        });
});

// Get urinals usage stats summary
router.get('/v1/signage/urinalsUsageStats.getCurrentSummary', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    var eventsize = req.query.eventsize;
    if(eventsize == null )
        eventsize = 0;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString();
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetUrinalsUsageStatsSummary(areauuid, startdate, enddate, eventsize, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'data recieved' });
            } else {
                console.log('detail not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'data not recieved' });
            }
        });
});

// Get cubicals usage stats summary
router.get('/v1/signage/cubicalsUsageStats.getCurrentSummary', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    var eventsize = req.query.eventsize;
    if(eventsize == null )
        eventsize = 0;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString();
    //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area uuid');
    } else
        signage.signageGetCubicalsUsageStatsSummary(areauuid, startdate, enddate, eventsize, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            } else if (results != null) {
                res.jsend.success({ result: results, code: 200, message: 'data recieved' });
            } else {
                console.log('detail not recieved');
                res.jsend.fail({ result: [], code: 400, message: 'data not recieved' });
            }
        });
});

module.exports = router;