var db = require('../db.js')

//Cubicals people count daily
exports.widgetGetCubicalVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    
    var sqlStr = "exec widget_GetArea_CubicalsPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//Urinals people count daily
exports.widgetGetUrinalVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_UrinalsPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//Total Area people count daily
exports.widgetGetAreaVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_PeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//Total Flush count today
exports.widgetGetAreaFlushsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_FlushesCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

exports.widgetGetNurseryRoomVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_NurseryRoomsPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

exports.widgetGetFamilyRoomsVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_FamilyRoomsPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}


exports.widgetGetPrmVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_PrmsPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

exports.widgetGetWashbasinVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_WashbasinsPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

exports.widgetGetFootwashVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_FootwashesPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

exports.widgetGetSoapUsageDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec signage_GetArea_WashbasinSoapDispsUsageStats '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//widget help alarms get for today total
exports.widgetGetHelpAlarmsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetHelpAlarms_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

exports.widgetGetAlarmsEventsDaily = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_AlarmsAndEventsDaily_Detail '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//widget hourly break of total visitors for an area today
exports.widgetGetAreaVisitorsDaily_HourlyBreakupAP = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec widget_GetArea_PeopleCountDaily_HourlyBreakup '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//widget hourly break of total visitors for an area today
exports.widgetGetAreaVisitorsDaily_HourlyBreakup = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec signage_GetArea_VisitorStats_DailySummary_PerHour '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}
//widget hourly break of total visitors for washbasins today
exports.widgetGetWashbasinsVisitorsDaily_HourlyBreakup = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec signage_GetArea_WashbasinsUsageStats_DailySummary_PerHour '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//widget hourly break of total visitors for cubicals today
exports.widgetGetCubicalsVisitorsDaily_HourlyBreakup = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec signage_GetArea_CubicalsUsageStats_DailySummary_PerHour '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//widget hourly break of total uses for soap  disp today
exports.widgetGetSoapUsageDaily_HourlyBreakup = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec signage_GetArea_WashbasinSoapDispsUsageStats_DailySummary_PerHour '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//widget hourly break of total visitors for urinals today
exports.widgetGetUrinalsVisitorsDaily_HourlyBreakup = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec signage_GetArea_UrinalsUsageStats_DailySummary_PerHour '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//widget daily break of all facilities of an area today
exports.widgetGetAllFacilitiesVisitorsDaily_Total = function(areauuid, startdate, enddate, facilitytypes, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec signage_GetArea_AllFacilitiesPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "','" + facilitytypes + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

//widget daily break of all facility types of an area today
exports.widgetGetAllFacilityTypesVisitorsDaily_Total = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    var sqlStr = "exec signage_GetArea_AllFacilityTypesPeopleCountDaily_Total '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        db.get().query(sqlStr, function(err, results) {
            if (err)
                return callback(err);
            if (!results.rows.length) {
                callback(null, null);
            } else {
                if (results.rows[0].count == null)
                    results.rows[0].count = 0;
                callback(null, results.rows);
            }
        });
    });
}

