var db = require('../db.js')

exports.facilityExists = function(facility, callback) {
    console.log('looking for: ' + facility.name + 'in areaid=' + facility.areaid);
    db.get().query('SELECT * FROM facility WHERE name = ? AND areaid = ?', [facility.name, facility.areaid], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.facilityIdExists = function(facility, callback) {
    console.log('looking for: ' + facility.id);
    db.get().query('SELECT * FROM facility WHERE id=?', [facility.id], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.facilityUUIDExists = function(facility, callback) {
    db.get().query('SELECT * FROM facility WHERE uuid=?', [facility.uuid], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.create = function(facility, callback) {
    //    db.get().query('INSERT INTO facility (uuid, name, description, type, status, areaid, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [facility.uuid, facility.name, facility.description, facility.type, facility.status, facility.areaid, facility.created, facility.modified], function(err, results) {

    db.get().query('INSERT INTO facility (uuid, name, description, type, status, areaid, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [facility.uuid, facility.name, facility.description, facility.type, facility.status, facility.areaid, facility.created, facility.modified], function(err, results) {
        if (err)
            return callback(err);
        //console.log(results);
        db.get().query('SELECT * FROM facility WHERE uuid = ?', [facility.uuid], function(err, results) {
            if (err)
                return callback(err);
            //console.log(results.rows[0]);
            //console.log("facility created id: " + results.rows[0].id);
            callback(null, results.rows[0].id);
        });
    });
}

exports.update = function(facility, callback) {
    db.get().query("UPDATE facility SET ? where uuid=?", [facility, facility.uuid], function(err, results) {
        {
            if (err) return callback(err);
        }
        callback(null, true);
    });

}

exports.removeById = function(id, callback) {
    db.get().query('DELETE FROM facility WHERE id = ?', [id], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.removeByUUID = function(uuid, callback) {
    db.get().query('DELETE FROM facility WHERE uuid = ?', [uuid], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.getAll = function(callback) {
    db.get().query("SELECT D.*, facilitytype.name 'typename' , facilitytype.icon from (SELECT facility.*, C.site_area, C.areauuid FROM facility INNER JOIN (SELECT A.uuid 'areauuid', A.id, CONCAT(B.name, ' - ', A.name) 'site_area'  FROM area A INNER JOIN area B ON A.parrentid = B.id) C ON facility.areaid = C.id) D INNER JOIN facilitytype ON D.type = facilitytype.id;", function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}

exports.getAllTypes = function(callback) {
    db.get().query('SELECT * FROM facilitytype ORDER BY name', function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}
exports.getByUUID = function(uuid, callback) {
    db.get().query("SELECT D.*, facilitytype.name 'typename' , facilitytype.icon from (SELECT facility.*, C.site_area FROM facility INNER JOIN (SELECT A.id, CONCAT(B.name, ' - ', A.name) 'site_area'  FROM area A INNER JOIN area B ON A.parrentid = B.id) C ON facility.areaid = C.id) D INNER JOIN facilitytype ON D.type = facilitytype.id WHERE D.uuid = ?;", [uuid], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}

exports.getById = function(id, callback) {
    db.get().query('SELECT * FROM facility WHERE id = ?', [id], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}



exports.getByAreaId = function(areaId, callback) {
    db.get().query('SELECT * FROM facility WHERE areaid = ?', [areaId], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}

exports.getByAreaUuid = function(uuid, callback) {
    var sqlStr = "SELECT facility.id, facilitytype.name 'facilitytypename', facilitytype.code, facility.name FROM facility INNER JOIN facilitytype ON facility.type = facilitytype.id INNER JOIN area ON facility.areaid = area.id WHERE area.uuid = '" + uuid + "'";
    //console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}
