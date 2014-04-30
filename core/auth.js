
module.exports = function(app) {
  // checking the security params
  app.use(function(req, res, next) {
    if (!req.session.connected && req.url != '/auth' ) {
      res.writeHead(302, {'Location': '/auth'});
      res.end();
    } else {
      next();
    }
  });
  var users = require(__dirname + '/../config/users.json');
  return {
    /**
     * Check the specified used and password
     */
    check: function(name, pwd) {
      if (users.hasOwnProperty(name)) {
        var user = users[name];
        return user.hasOwnProperty('password') && user.password == pwd;
      } else {
        return false;
      }
    }
  };
};

