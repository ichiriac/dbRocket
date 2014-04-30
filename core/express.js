/**
 * Module dependencies.
 */
var express = require('express');
var swig = require('swig');
var config = require('../config/config');

module.exports = function(app) {

    console.log('... configuring express');

    app.set('showStackError', config.showStackError);

    //Prettify HTML
    app.locals.pretty = config.prettyHTML;

    //Should be placed before express.static
    app.use(require('compression')({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Setting the fav icon and static folder
    app.use(express.static(config.root + '/public'));

    //Set views path, template engine and default layout
    swig.setDefaults({ cache: false });
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', config.root + '/app/views');

    //Enable jsonp
    app.enable("jsonp callback");

    //cookieParser should be above session
    app.use(require('cookie-parser')());

    // request body parsing middleware should be above methodOverride
    app.use(require('body-parser').urlencoded());

    // session manager
    app.use(require('express-session')({
        secret: '$uper$ecret$e$$ionKey'
        ,key: 'sid'
        ,cookie: {
          httpOnly: true
        }
    }));

    //connect flash for flash messages
    app.use(require('connect-flash')());

    //dynamic helpers
    app.use(require('view-helpers')(config.app.name));

};