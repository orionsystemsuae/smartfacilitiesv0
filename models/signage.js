var db = require('../db.js')

exports.signageGetCubicalsAvilableNowSummary = function(areauuid, startdate, enddate, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);

    var sqlStr = "exec signage_GetArea_CubicalsAvilability_Summary '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);

    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetCubicalsAvilableNowDetail = function(areauuid, callback) {
    var sqlStr = "exec GetCubicalsAvilabilityDetail '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetWashbasinsAvilableNowSummary = function(areauuid, callback) {
    var sqlStr = "exec signage_GetArea_WashbasinsAvilability_Summary '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetWashbasinsAvilableNowDetail = function(areauuid, callback) {
    var sqlStr = "exec GetWashbasinsAvilabilityDetail '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetUrinalsAvilableNowSummary = function(areauuid, callback) {
    var sqlStr = "exec signage_GetArea_UrinalsAvilability_Summary '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetUrinalsAvilableNowDetail = function(areauuid, callback) {
    var sqlStr = "exec GetUrinalsAvilabilityDetail '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetFootWashsAvilableNowSummary = function(areauuid, callback) {
    var sqlStr = "exec signage_GetArea_FootWashsAvilability_Summary '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetFootWashsAvilableNowDetail = function(areauuid, callback) {
    var sqlStr = "exec GetFootWashsAvilabilityDetail '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetWashbasinsUsageStatsNowSummary = function(areauuid, callback) {
    var sqlStr = "exec signage_GetArea_WashbasinsUsageStats_Last15Min '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetUrinalsUsageStatsNowSummary = function(areauuid, callback) {
    var sqlStr = "exec signage_GetArea_UrinalsUsageStats_Last15Min '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetCubicalsUsageStatsNowSummary = function(areauuid, callback) {
    var sqlStr = "exec signage_GetArea_CubicalsUsageStats_Last15Min '" + areauuid + "'";
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetCubicalsUsageStatsSummary = function(areauuid, startdate, enddate, eventsize, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    console.log(eventsize);
    // var sqlStr = "exec signage_GetArea_CubicalsUsageStats '" + areauuid + "','" + startdate + "','" + enddate + "','" + eventsize + "'";
    var sqlStr = "exec signage_GetArea_CubicalsUsageStats '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);

    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetUrinalsUsageStatsSummary = function(areauuid, startdate, enddate, eventsize, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    console.log(eventsize);
    //var sqlStr = "exec signage_GetArea_UrinalsUsageStats '" + areauuid + "','" + startdate + "','" + enddate + "','" + eventsize + "'";
    var sqlStr = "exec signage_GetArea_UrinalsUsageStats '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}

exports.signageGetWashbasinsUsageStatsSummary = function(areauuid, startdate, enddate, eventsize, callback) {
    console.log(areauuid);
    console.log(startdate);
    console.log(enddate);
    console.log(eventsize);
    //var sqlStr = "exec signage_GetArea_WashbasinsUsageStats '" + areauuid + "','" + startdate + "','" + enddate + "','" + eventsize + "'";
    var sqlStr = "exec signage_GetArea_WashbasinsUsageStats '" + areauuid + "','" + startdate + "','" + enddate + "'";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else
            callback(null, results.rows);
    });
}



