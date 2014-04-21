var fs = require('fs');
var express = require('express');

// Application routing
module.exports = function(app) {
    console.log('... configuring routes');

    //routes should be at the last
    var router = express.Router();
    router.param(function(name, fn){
      if (fn instanceof RegExp) {
        return function(req, res, next, val){
          var captures;
          if (captures = fn.exec(String(val))) {
            req.params[name] = captures;
            next();
          } else {
            next('route');
          }
        };
      }
    });
    var path = app.config.root + '/app/controllers';
    var files = fs.readdirSync(path);
    for(var i in files) {
        var controller = require(path + '/' + files[i]);
        for(var a in controller) {
            var action = controller[a];
            if (action.hasOwnProperty('path')) {
                if (action.hasOwnProperty('params')) {
                    for(var i in action.params) {
                      router.param(i, action.params[i]);
                    }
                }
                var route = router.route(action.path);
                if (action.hasOwnProperty('all')) route.all(action.all);
                if (action.hasOwnProperty('get')) route.get(action.get);
                if (action.hasOwnProperty('put')) route.all(action.put);
                if (action.hasOwnProperty('post')) route.all(action.post);
                if (action.hasOwnProperty('delete')) route['delete'](action['delete']);
            }
        }
    }
    app.use(router);
    //Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        //Treat as 404
        if (~err.message.indexOf('not found')) return next();

        //Log it
        console.error(err.stack);

        //Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    //Assume 404 since no middleware responded
    app.use(function(req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
};