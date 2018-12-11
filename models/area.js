var db = require('../db.js')
var config = require('../config.js')
var Registry = require('azure-iothub').Registry;

exports.areaExists = function(area, callback) {
    console.log('looking for: ' + area.name);
    db.get().query('SELECT * FROM area where name=? and parrentId=?', [area.name, area.parrentid], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.areaUUIDExists = function(area, callback) {
    console.log('looking for: ' + area.uuid);
    db.get().query("SELECT * FROM area WHERE uuid = ?", [area.uuid], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.create = function(area, callback) {
    db.get().query('INSERT INTO area(uuid, name, abbr, description, gpslocation, type, status, level, parrentid, enterpriseid, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [area.uuid, area.name, area.abbr, area.description == "" ? "   " : area.description, area.gpslocation, area.type, area.status, area.level, area.parrentid, area.enterpriseid, area.created, area.modified], function(err, results) {
        {
            //   console.log(err);
            if (err) return callback(err);
        }
        console.log("area created id: " + results.lastInsertId);
        callback(null, results.lastInsertId);
    });

}

exports.update = function(area, callback) {
    console.log(area);
    db.get().query("UPDATE area SET name=?, abbr=?, description=?, type=?, status=?, parrentid=?, enterpriseid=?, modified=? where uuid=?", [area.name, area.abbr, area.description == "" ? "   " : area.description, area.type, area.status, area.parrentid, area.enterpriseid, area.modified, area.uuid], function(err, results) {
        {
            //   console.log(err);
            if (err) return callback(err);
        }
        callback(null, results.lastInsertId);
    });

}

exports.removeById = function(id, callback) {
    db.get().query('DELETE FROM area WHERE id = ?', [id], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.removeByUUID = function(uuid, callback) {
    db.get().query('DELETE FROM area WHERE uuid = ?', [uuid], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.get = function(uuid, callback) {
    db.get().query("SELECT A.id, A.uuid, A.name, A.abbr, A.description, A.type, A.status, A.gpslocation, A.parrentid, A.created, A.modified, B.name 'site', B.abbr 'siteabbr', B.enterpriseid, (SELECT name FROM enterprise where id = B.enterpriseid) 'enterprise', (SELECT abbr FROM enterprise where id = B.enterpriseid) 'enterpriseabbr'  FROM area A INNER JOIN area B ON A.parrentid = B.id WHERE A.uuid = '" + uuid + "'", function(err, results) {
        if (err) return callback(err);
        if (!results.rows.length) {
            callback(null, null);
        } else {
            callback(null, results.rows[0]);
        }
    });
}

exports.getAll = function(callback) {
    // db.get().query('SELECT * FROM area WHERE parrentid IS NOT NULL;', function(err, rows) {
    db.get().query('SELECT A.id, A.uuid, A.name, A.abbr, A.description, A.type, A.status, A.gpslocation, A.parrentid, A.created, A.modified, B.name "site", B.abbr "siteabbr", B.enterpriseid, (SELECT name FROM enterprise where id = B.enterpriseid) "enterprise", (SELECT abbr FROM enterprise where id = B.enterpriseid) "enterpriseabbr"  FROM area A INNER JOIN area B ON A.parrentid = B.id', function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}

exports.getAllSitesByUserUUID = function(useruuid, callback) {
    db.get().query('SELECT DISTINCT site.* FROM (SELECT A.*, B.name "enterprise" FROM area A INNER JOIN enterprise B ON A.enterpriseid = B.id WHERE A.parrentid = -1) AS site INNER JOIN userrights ON site.uuid = userrights.siteuuid WHERE userrights.useruuid = ?;', [useruuid], function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}


exports.getAllAreasByUserUUID = function(uuid, callback) {
    db.get().query("SELECT * FROM area WHERE parrentid IN (SELECT id 'areaid' FROM area INNER JOIN userrights ON area.uuid = userrights.siteuuid WHERE userrights.useruuid = ?);", [uuid], function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}

exports.getAllSites = function(callback) {
    db.get().query('SELECT A.*, B.name "enterprise" FROM area A INNER JOIN enterprise B ON A.enterpriseid = B.id WHERE A.parrentid = -1;', function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}

exports.getByUUID = function(uuid, callback) {
    db.get().query('SELECT * FROM area WHERE uuid = ?', [uuid], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}

exports.getByParrentUUID = function(uuid, callback) {
    db.get().query('SELECT * FROM area WHERE parrentid = (select id from area where uuid = ?)', [uuid], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}

exports.getById = function(id, callback) {
    db.get().query('SELECT * FROM area WHERE id = ?', [id], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}

exports.getByParrentId = function(parrentId, callback) {
    db.get().query('SELECT * FROM area WHERE parrentid = ?', [parrentId], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}

exports.getByEnterpriseId = function(enterpriseid, callback) {
    db.get().query('SELECT * FROM area WHERE enterpriseid = ?', [enterpriseid], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows);
        else
            callback(null, null);
    });
}

exports.addToCloud = function(device, callback) {

    var iotHubRegistry = Registry.fromConnectionString(config.iothub);
    // device = {
    //     deviceId: id,
    //     status: 'enabled',
    //     symmetricKey: {  // <- this is the correct thing (camel-cased)
    //         primaryKey: null,
    //         secondaryKey: null
    //       }
    //     }
    // };
    iotHubRegistry.create(device, function(err, deviceInfo, res) {
        if (err) {
            console.log('Error while trying to create a new cloud device: ' + err.toString());
            callback(null, null);

        } else if (deviceInfo) {
            printDeviceInfo(err, deviceInfo, res);
            callback(null, deviceInfo.authentication.SymmetricKey.primaryKey);
        }

    });
}

function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
        console.log('Device ID: ' + deviceInfo.deviceId);
        console.log('Device key Primary: ' + deviceInfo.authentication.symmetricKey.primaryKey);
        console.log('Device key Secondary: ' + deviceInfo.authentication.symmetricKey.secondaryKey);

    }
}

exports.removeFromCloud = function(id, callback) {

    var iotHubRegistry = Registry.fromConnectionString(config.iothub);
    iotHubRegistry.delete(id, function(err, res) {
        if (err) {
            console.log('Error while trying to delete cloud device: ' + err.toString());
            callback(null, null);

        } else {
            console.log('Cloud device removed.');
            callback(null, true);

        }
    });
}