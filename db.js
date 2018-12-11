var db = require('any-db');

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
    pool: null,
    mode: null,
}

exports.connect = function(dbURL, mode, done) {
    state.pool = db.createPool(dbURL, { min: 2, max: 20 })
    state.mode = mode
    done()
}

exports.get = function() {
    return state.pool
}

// exports.fixtures = function(data) {
//     var pool = state.pool
//     if (!pool) return done(new Error('Missing database connection.'))

//     var names = Object.keys(data.tables)
//     async.each(names, function(name, cb) {
//         async.each(data.tables[name], function(row, cb) {
//             var keys = Object.keys(row),
//                 values = keys.map(function(key) { return "'" + row[key] + "'" })

//             pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
//         }, cb)
//     }, done)
// }

// exports.drop = function(tables, done) {
//     var pool = state.pool
//     if (!pool) return done(new Error('Missing database connection.'))

//     async.each(tables, function(name, cb) {
//         pool.query('DELETE * FROM ' + name, cb)
//     }, done)
// }