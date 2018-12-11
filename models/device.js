var db = require('../db.js')
var config = require('../config.js')
exports.deviceExists = function(device, callback) {
    console.log('looking for: ' + device.name);
    db.get().query('SELECT * FROM device WHERE name=? AND facilityid=?', [device.name, device.facilityid], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.deviceIdExists = function(device, callback) {
    console.log('looking for: ' + device.id);
    db.get().query('SELECT * FROM device WHERE id=?', [device.id], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.deviceUUIDExists = function(device, callback) {
    db.get().query('SELECT * FROM device WHERE uuid=?', [device.uuid], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.create = function(device, callback) {
    device.key = "0000";
    db.get().query('INSERT INTO device (uuid, name, [key], description, type, status, facilityid, facilityuuid, created, modified) VALUES (?,?,?,?,?,?,?,?,?,?)', [device.uuid, device.name, device.key, device.description, device.type, device.status, device.facilityid, device.facilityuuid, device.created, device.modified], function(err, results) {
        {
            if (err) return callback(err);
        }
        console.log("device created id: " + results.lastInsertId);
        callback(null, true);
    });
}

exports.update = function(device, callback) {
    db.get().query("UPDATE device SET ? where uuid=?", [device, device.uuid], function(err, results) {
        {
            if (err) return callback(err);
        }
        callback(null, results.lastInsertId);
    });

}

exports.removeById = function(id, callback) {
    db.get().query('DELETE FROM device WHERE id = ?', [id], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.removeByUUID = function(uuid, callback) {
    db.get().query('DELETE FROM device WHERE uuid = ?', [uuid], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.getAll = function(callback) {
    db.get().query('SELECT * FROM device ORDER BY name', function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}

exports.getAllTypes = function(callback) {
    db.get().query('SELECT * FROM devicetype ORDER BY name', function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}

exports.getTypesByCodes = function(deviceTypes, callback) {
    db.get().query('SELECT * FROM devicetype WHERE CODE IN (' + deviceTypes + ') ORDER BY name', function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}
exports.getByUUID = function(uuid, callback) {
    db.get().query('SELECT * FROM device WHERE uuid = ?', [uuid], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}

exports.getByFacilityId = function(facilityId, callback) {
    db.get().query('SELECT * FROM device WHERE facilityid = ?', [facilityId], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}

exports.getByFacilityUUID = function(facilityUUID, callback) {
    db.get().query('SELECT * FROM device WHERE facilityuuid = ?', [facilityUUID], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}

exports.getByAreaUUID = function(uuid, callback) {
    var queryStr = "SELECT id 'deviceid', uuid 'deviceuuid', name 'devicename', devicetype.code 'devicecode', [key] 'areaGatewaySecurityKey', area.areaname + '-' + area.areauuid 'areaGatewayDeviceId', description, '' protocol, '' address, facility.facilityid, facility.facilityuuid, facility.facilityname, facility.facilitytypeid, facility.facilitytypecode, facility.facilitytypename, facility.areaid, area.areauuid, area.areaname FROM device " +
        "INNER JOIN (SELECT facility.id 'facilityid', facility.uuid 'facilityuuid', facility.type 'facilitytypeid', facility.name 'facilityname', facility.areaid, facilitytype.name 'facilitytypename', facilitytype.code 'facilitytypecode' FROM facility INNER JOIN facilitytype ON facility.type = facilitytype.id) facility " +
        "ON device.facilityid = facility.facilityid " +
        "INNER JOIN (SELECT devicetype.id 'type', devicetype.code FROM devicetype) devicetype " +
        "ON device.type = devicetype.type " +
        "INNER JOIN (SELECT area.id 'areaid', area.uuid 'areauuid', area.name 'areaname' FROM area) area " +
        "ON facility.areaid = area.areaid " +
        "WHERE area.areauuid = ?";
    //console.log(queryStr);
    db.get().query(queryStr, [uuid], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}

exports.getById = function(id, callback) {
    db.get().query('SELECT * FROM device WHERE id = ?', [id], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}



exports.getByAreaId = function(areaId, callback) {
    db.get().query('SELECT * FROM device WHERE areaid = ?', [areaId], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}
