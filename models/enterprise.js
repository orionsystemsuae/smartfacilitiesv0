var db = require('../db.js')

exports.enterpriseExists = function(enterprise, callback) {
    console.log('looking for: ' + enterprise.name);
    db.get().query('SELECT * FROM enterprise WHERE name=?', [enterprise.name], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.enterpriseIdExists = function(enterprise, callback) {
    console.log('looking for: ' + enterprise.id);
    db.get().query('SELECT * FROM enterprise WHERE id=?', [enterprise.id], function(err, results) {
        if (err)
            return callback(err);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.enterpriseUUIDExists = function(enterprise, callback) {
    console.log('looking for: ' + enterprise.uuid);
    //
    var sqlStr = "SELECT * FROM enterprise WHERE uuid = '" + enterprise.uuid + "'";
    //console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {
        if (err)
            return callback(err);
        //console.log('rows:');
        //console.log(results.rows);
        if (!results.rows.length) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
}

exports.create = function(enterprise, callback) {
    console.log('enterprise recieved = ' + enterprise.name);
    console.log(enterprise);

    db.get().query('INSERT INTO enterprise VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [enterprise.uuid, enterprise.name, enterprise.abbr, enterprise.description, enterprise.status, enterprise.created, enterprise.modified, enterprise.createdby], function(err, results) {
        {
            console.log(err);
            if (err) return callback(err);
        }
        console.log("enterprise created id: " + results.lastInsertId);
        callback(null, results.lastInsertId);
    });

}

exports.update = function(enterprise, callback) {
    db.get().query("UPDATE enterprise SET name=?, abbr=?, description=?, status=?, modified=? where uuid = ?", [enterprise.name, enterprise.abbr, enterprise.description, enterprise.status, enterprise.modified, enterprise.uuid], function(err, results) {
        {
            console.log(err);
            if (err) return callback(err);
        }
        callback(null, results.lastInsertId);
    });

}

exports.removeById = function(id, callback) {
    db.get().query("DELETE FROM enterprise WHERE id = '" + [id] + "'", function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.removeByUUID = function(uuid, callback) {
    db.get().query("DELETE FROM enterprise WHERE uuid = '" + uuid + "'", function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.getAll = function(callback) {
    db.get().query('SELECT * FROM enterprise;', function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}

exports.getById = function(id, callback) {
    db.get().query('SELECT * FROM enterprise WHERE id = ?', [id], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}

exports.getByUUID = function(uuid, callback) {
    db.get().query('SELECT * FROM enterprise WHERE uuid = ?', [uuid], function(err, results) {
        if (err) return callback(err);
        if (results.rows.length > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}