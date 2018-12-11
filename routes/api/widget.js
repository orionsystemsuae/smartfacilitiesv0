var express = require('express');
var widgets = require('../../models/widget');
const uid = require('short-id');
var router = express.Router();

// Get all alarm count for today by areauuid
router.get('/v1/widgets/cubicalVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetCubicalVisitorsDaily_Total(areauuid, startdate, enddate, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (results != null) {
                //console.log('records found count:' + alarms.count);
                res.jsend.success({ result: results, code: 200, message: 'records found' });
            } else {
                //console.log('no alamrs found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get urinal visitors count for today by areauuid
router.get('/v1/widgets/urinalVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetUrinalVisitorsDaily_Total(areauuid, startdate, enddate, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (results != null) {
                //console.log('urinal records found count:' + results.count);
                res.jsend.success({ result: results, code: 200, message: 'records found' });
            } else {
                //console.log('no urinal records found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get area visitors count for today by areauuid
router.get('/v1/widgets/areaVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetAreaVisitorsDaily_Total(areauuid, startdate, enddate, function(err, results) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (results != null) {
                //console.log('records found count:' + visitors.count);
                res.jsend.success({ result: results, code: 200, message: 'records found' });
            } else {
                //console.log('no records found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get flushes count for today by areauuid
router.get('/v1/widgets/flushes.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetAreaFlushsDaily_Total(areauuid, startdate, enddate, function(err, flushes) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (flushes != null) {
                //console.log('records found count:' + flushes.count);
                res.jsend.success({ result: flushes, code: 200, message: 'records found' });
            } else {
                //console.log('no records found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});



// Get nursery visits count for today by areauuid
router.get('/v1/widgets/nurseryRoomVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetNurseryRoomVisitorsDaily_Total(areauuid, startdate, enddate, function(err, visits) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (visits != null) {
                //console.log('nursery visits found count:' + visits.count);
                res.jsend.success({ result: visits, code: 200, message: 'records found' });
            } else {
                //console.log('no nursery visits found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get family visits count for today by areauuid
router.get('/v1/widgets/familyRoomVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetFamilyRoomsVisitorsDaily_Total(areauuid, startdate, enddate, function(err, visits) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (visits != null) {
                //console.log('family room visits found count:' + visits.count);
                res.jsend.success({ result: visits, code: 200, message: 'records found' });
            } else {
                //console.log('no family room visits found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});


// Get prm visits count for today by areauuid
router.get('/v1/widgets/prmVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetPrmVisitorsDaily_Total(areauuid, startdate, enddate, function(err, visits) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (visits != null) {
                //console.log('prm visits found count:' + visits.count);
                res.jsend.success({ result: visits, code: 200, message: 'records found' });
            } else {
                //console.log('no prm visits found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get washbasin visitors count for today by areauuid
router.get('/v1/widgets/washbasinVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetWashbasinVisitorsDaily_Total(areauuid, startdate, enddate, function(err, visitors) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (visitors != null) {
                //console.log('washbasin records found count:' + visitors.count);
                res.jsend.success({ result: visitors, code: 200, message: 'records found' });
            } else {
                //console.log('no washbasin records found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get footwash visitors count for today by areauuid
router.get('/v1/widgets/footwashVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetFootwashVisitorsDaily_Total(areauuid, startdate, enddate, function(err, visitors) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (visitors != null) {
                //console.log('records found count:' + visitors.count);
                res.jsend.success({ result: visitors, code: 200, message: 'records found' });
            } else {
                //console.log('no records found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get soap usage visitor count for today by areauuid
router.get('/v1/widgets/soapUsageDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetSoapUsageDaily_Total(areauuid, startdate, enddate, function(err, visitors) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (visitors != null) {
                //console.log('records found count:' + visitors.count);
                res.jsend.success({ result: visitors, code: 200, message: 'records found' });
            } else {
                //console.log('no records found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get emergency PRM alarm count for today by areauuid
router.get('/v1/widgets/helpAlarmsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetHelpAlarmsDaily_Total(areauuid, startdate, enddate, function(err, alarms) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (alarms != null) {
                //console.log('records found count:' + alarms.count);
                res.jsend.success({ result: alarms, code: 200, message: 'records found' });
            } else {
                //console.log('no alamrms found');
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});



// Get alarm and events count for today by areauuid
router.get('/v1/widgets/alarmsEventsDaily.get', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetAlarmsEventsDaily(areauuid, startdate, enddate, function(err, alarmsevents) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (alarmsevents != null) {
                res.send(alarmsevents);
            } else {
                res.send('');
            }
        });
});

// Get area visitors by hourly breakup by areauuid
router.get('/v1/widgets/areaVisitorsDailyAP.getHourlyBreakup', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetAreaVisitorsDaily_HourlyBreakupAP(areauuid, startdate, enddate, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
                res.send(records);
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get area visitors by hourly breakup by areauuid
router.get('/v1/widgets/areaVisitorsDaily.getHourlyBreakup', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetAreaVisitorsDaily_HourlyBreakup(areauuid, startdate, enddate, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
                res.send(records);
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get cubicals visitors by hourly breakup by areauuid
router.get('/v1/widgets/cubicalsVisitorsDaily.getHourlyBreakup', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString();
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetCubicalsVisitorsDaily_HourlyBreakup(areauuid, startdate, enddate, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
                res.send(records);
                //res.jsend.success({ result: records, code: 200, message: 'records found' });
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get washbasins visitors by hourly breakup by areauuid
router.get('/v1/widgets/washbasinsVisitorsDaily.getHourlyBreakup', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetWashbasinsVisitorsDaily_HourlyBreakup(areauuid, startdate, enddate, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
                res.send(records);
               //res.jsend.success({ result: records, code: 200, message: 'records found' });
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get soap disp visitors by hourly breakup by areauuid
router.get('/v1/widgets/soapDispUsesDaily.getHourlyBreakup', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString();
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetSoapUsageDaily_HourlyBreakup(areauuid, startdate, enddate, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
               // res.send(records);
                res.jsend.success({ result: records, code: 200, message: 'records found' });
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get urinals visitors by hourly breakup by areauuid
router.get('/v1/widgets/urinalsVisitorsDaily.getHourlyBreakup', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetUrinalsVisitorsDaily_HourlyBreakup(areauuid, startdate, enddate, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
                res.send(records);
               // res.jsend.success({ result: records, code: 200, message: 'records found' });
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get all facility visitors by hourly breakup by areauuid
router.get('/v1/widgets/allFacilitisVisitorsDaily.getHourlyBreakup', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    var cubicalResults, washbasinResults, urinalResults;
    
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetCubicalsVisitorsDaily_HourlyBreakup(areauuid, startdate, enddate, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
                //res.send(records);
                cubicalResults = records;

                //get washbasin results
                widgets.widgetGetWashbasinsVisitorsDaily_HourlyBreakup(areauuid, startdate, enddate, function(err, records) {
                    if (err) {
                        console.error('Error: ' + err);
                        res.jsend.error(err);
                        return;
                    }
                    if (records != null) {
                        washbasinResults = records;
                         //get urinal results
                        widgets.widgetGetUrinalsVisitorsDaily_HourlyBreakup(areauuid, startdate, enddate, function(err, records) {
                            if (err) {
                                console.error('Error: ' + err);
                                res.jsend.error(err);
                                return;
                            }
                            if (records != null) {
                                urinalResults = records;
                                let combinedResults = { 'Time': [], 'Cubical': [], 'Washbasin': [], 'Urinal': [] };
                                cubicalResults.forEach(element => {
                                    combinedResults.Time.push(element.hour);
                                    combinedResults.Cubical.push(element.count);
                                });
                                washbasinResults.forEach(element => {
                                    combinedResults.Washbasin.push(element.count);
                                });
                                urinalResults.forEach(element => {
                                    combinedResults.Urinal.push(element.count);
                                });
                                res.send(combinedResults);

                            } else {
                                let combinedResults = { 'Time': [], 'Cubical': [], 'Washbasin': [] };
                                cubicalResults.forEach(element => {
                                    combinedResults.Time.push(element.hour);
                                    combinedResults.Cubical.push(element.count);
                                });
                                washbasinResults.forEach(element => {
                                    combinedResults.Washbasin.push(element.count);
                                });                
                                res.send(combinedResults);
                            }
                        });
                        
                    } else {
                        let combinedResults = { 'Time': [], 'Cubical': []};
                                cubicalResults.forEach(element => {
                                    combinedResults.Time.push(element.hour);
                                    combinedResults.Cubical.push(element.count);
                                });                        
                                res.send(combinedResults);
                    }
                });
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get all facilities visitors total count  by areauuid
router.get('/v1/widgets/allFacilitiesVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    var facilitytypes = req.query.facilitytypes;

    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetAllFacilitiesVisitorsDaily_Total(areauuid, startdate, enddate, facilitytypes, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
                res.send(records);
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});

// Get all facilitie type visitors total count by areauuid
router.get('/v1/widgets/allFacilityTypeVisitorsDaily.getTotal', function(req, res, next) {
    var areauuid = req.query.areauuid;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    if (startdate == null || enddate == null)
        startdate = enddate = new Date().toISOString()
        //retrive data from database
    if (areauuid == null) {
        res.jsend.error('invalid area Id');
    } else
        widgets.widgetGetAllFacilityTypesVisitorsDaily_Total(areauuid, startdate, enddate, function(err, records) {
            if (err) {
                console.error('Error: ' + err);
                res.jsend.error(err);
                return;
            }
            if (records != null) {
                res.send(records);
            } else {
                res.jsend.fail({ result: [], code: 400, message: 'records not found' });
            }
        });
});


module.exports = router;