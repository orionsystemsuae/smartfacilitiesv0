var db = require('../db.js')

exports.userExists = function(email, callback) {
    console.log('looking for: ' + email);
    db.get().query('SELECT * FROM [user] where email=?', [email], function(err, results) {
        if (err)
            return callback(err);
        if (results.rowCount > 0) {
            callback(null, results.rows[0]);
        } else {
            callback(null, null);
        }
    });
}

exports.adminExists = function(email, callback) {
    console.log('looking for: ' + email);
    db.get().query('SELECT * FROM [user] WHERE email=? AND role=1', [email], function(err, results) {
        if (err)
            return callback(err);
        // console.log("users found: " + rows.length);
        if (results.rowCount > 0) {
            callback(null, results.rows[0]);
            // console.log("users doesnot exist: " + rows.length);
        } else {
            callback(null, null);
        }
    });
}

exports.signin = function(user, callback) {

    console.log('user recieved = ' + user.email);
    console.log('user password = ' + user.password);

    db.get().query('SELECT * FROM [user] WHERE email = ?', [user.email, user.password], function(err, results) {
        //console.log(results);
        if (err) return callback(err);
        if (results.rowCount > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}

exports.create = function(user, callback) {
    db.get().query('INSERT INTO [user] (uuid, firstname, lastname, email, mobileno, password, status, role, gender, image, created, modified, createdby) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [user.uuid, user.firstname, user.lastname, user.email, user.mobileno, user.password, user.status, user.role, user.gender, 0, user.created, user.modified, user.createdby], function(err, results) {
        {
            console.log(err);
            if (err) return callback(err);
        }
        callback(null, true);
    });
}

exports.createMembership = function(userrights, callback) {
    console.log("inserting...");
    var sqlStr = "INSERT INTO userrights (useruuid, siteuuid) VALUES ('" + userrights.useruuid + "', '" + userrights.siteuuid + "')";
    console.log(sqlStr);
    db.get().query(sqlStr, function(err, results) {

        console.log(err);
        if (err)
            callback(err);
        else
            callback(null, true);
    });
}

exports.update = function(user, callback) {
    console.log("**********");
    console.log(user.image);
    db.get().query("UPDATE [user] SET firstname=?, lastname=?, mobileno=?, status=?, role=?, modified=?, image=? where email=?", [user.firstname, user.lastname, user.mobileno, user.status, user.role, user.modified, 'user.image', user.email], function(err, results) {
        {
            //   console.log(err);
            if (err) return callback(err);
        }
        callback(null, true);
    });

}

// exports.updateMembership = function(userrighs, callback) {
//     db.get().query('INSERT INTO userrights (userid, siteid) VALUES (?, ?)', [userrights.userid, userrights.siteid], function(err, results) {
//         if (err) return callback(err);
//         console.log("user memberships: " + results)
//         callback(null, true);
//     });
//     return;
// }

exports.deleteMembership = function(uuid, callback) {
    db.get().query('DELETE FROM userrights WHERE useruuid=?;', [uuid], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
    return;
}

exports.removeByEmail = function(email, callback) {
    db.get().query('DELETE FROM [user] WHERE email = ?', [email], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}

exports.removeById = function(id, callback) {
    db.get().query('DELETE FROM [user] WHERE id = ?', [id], function(err, results) {
        if (err) return callback(err);
        callback(null, true);
    });
}
exports.getAll = function(callback) {
    db.get().query('SELECT * FROM [user];', function(err, results) {
        if (err) return callback(err);
        callback(null, results.rows);
    });
}
exports.getByEmail = function(email, callback) {
    //console.log('SELECT * FROM [user] WHERE email = ?' + email);
    db.get().query('SELECT * FROM [user] WHERE email = ?', [email], function(err, results) {
        console.log(results);
        if (err) return callback(err);
        if (results.rowCount > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}

exports.getByUUID = function(uuid, callback) {
    // console.log(email);
    db.get().query('SELECT * FROM [user] WHERE uuid = ?', [uuid], function(err, results) {
        if (err) return callback(err);
        if (results.rowCount > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}

exports.getById = function(userId, callback) {
    db.get().query('SELECT * FROM [user] WHERE id = ?', [userId], function(err, results) {
        if (err) return callback(err);
        if (results.rowCount > 0)
            callback(null, results.rows[0]);
        else
            callback(null, null);
    });
}