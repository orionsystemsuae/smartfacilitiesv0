var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var engine = require('ejs-locals');
var config = require('./config');
var jsend = require('jsend');
var session = require('client-sessions');

//configure jsend middelware
app.use(jsend.middleware);

//configure session settings
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 7 * 24 * 60 * 60 * 1000,
    activeDuration: 2 * 24 * 60 * 60 * 1000,
}));


function requireAuthentication(req, res, next) {
    //console.log('requireAuthentication');
    // console.log(req.session);
    if (req.session && req.session.user) {
        if (req.session.seenyou) {
            res.setHeader('X-Seen-You', 'true');
        } else {
            // setting a property will automatically cause a Set-Cookie response 
            // to be sent 
            req.session.seenyou = true;
            res.setHeader('X-Seen-You', 'false');
        }
        next();
    } else {
        res.redirect('/signin');
    }
};

//route central authentications
app.all('/index*', requireAuthentication);
app.all('/home*', requireAuthentication);
app.all('/profile*', requireAuthentication);
app.all('/notifications*', requireAuthentication);
app.all('/users*', requireAuthentication);
app.all('/user*', requireAuthentication);
app.all('/enterprises*', requireAuthentication);
app.all('/enterprise*', requireAuthentication);
app.all('/sites*', requireAuthentication);
app.all('/site*', requireAuthentication);
app.all('/facilities*', requireAuthentication);
app.all('/facility*', requireAuthentication);
app.all('/areas*', requireAuthentication);
app.all('/area*', requireAuthentication);
app.all('/report_visitors*', requireAuthentication);
app.all('/report_facility*', requireAuthentication);
app.all('/report_comparison*', requireAuthentication);

//page route files
var index = require('./routes/index');
var home = require('./routes/home');
var report_visitors = require('./routes/report_visitors');
var report_comparison = require('./routes/report_comparison');
var report_facility = require('./routes/report_facility');
var profile = require('./routes/profile');
var notifications = require('./routes/notifications');
var sysdash = require('./routes/sysdash');
var users = require('./routes/users');
var user = require('./routes/user');
var enterprises = require('./routes/enterprises');
var enterprise = require('./routes/enterprise');
var sites = require('./routes/sites');
var site = require('./routes/site');
var areas = require('./routes/areas');
var area = require('./routes/area');
var facilities = require('./routes/facilities');
var facility = require('./routes/facility');
var signin = require('./routes/signin');
var signup = require('./routes/signup');
var signout = require('./routes/signout');
var reset = require('./routes/reset');
var message = require('./routes/message');
var password = require('./routes/password');

//api route files
var api_user = require('./routes/api/user');
var api_enterprise = require('./routes/api/enterprise');
var api_area = require('./routes/api/area');
var api_facility = require('./routes/api/facility');
var api_device = require('./routes/api/device');
var api_widget = require('./routes/api/widget');
var api_signage = require('./routes/api/signage');
var api_report = require('./routes/api/report');



//configure validator settings
app.use(validator());
app.use(validator({
    customValidators: {
        isArray: function(value) {
            return Array.isArray(value);
        },

        isLessEqual: function(param, num) {
            return param <= num;
        },

        isGreatEqual: function(param, num) {
            return param >= num;
        },

        isLess: function(param, num) {
            return param < num;
        },

        isGreat: function(param, num) {
            return param > num;
        },

        isEqual: function(param, num) {
            return param == num;
        }
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//add static paths of global public folde
app.use(express.static(path.join(__dirname, 'public')));

//routes - pages
app.use('/', index);
app.use('/', home);
app.use('/', report_visitors);
app.use('/', report_facility);
app.use('/', report_comparison);
app.use('/', profile);
app.use('/', notifications);
app.use('/', sysdash);
app.use('/', users);
app.use('/', user);
app.use('/', enterprises);
app.use('/', enterprise);
app.use('/', sites);
app.use('/', site);
app.use('/', areas);
app.use('/', area);
app.use('/', facilities);
app.use('/', facility);
app.use('/', signup);
app.use('/', signin);
app.use('/', signout);
app.use('/', reset);
app.use('/', message);
app.use('/', password);


//routes - api
app.use('/api', api_user);
app.use('/api', api_enterprise);
app.use('/api', api_area);
app.use('/api', api_facility);
app.use('/api', api_device);
app.use('/api', api_widget);
app.use('/api', api_signage);
app.use('/api', api_report);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;