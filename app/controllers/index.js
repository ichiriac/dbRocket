/**
 * The homepage
 */
module.exports = {
    index: {
        path: '/',
        get: function(req, res) {
            res.render('index');
        }
    },
    auth: {
      path: '/auth',
      get: function(req, res) {
        res.render('auth');
      },
      post: function(req, res) {
        var err = null;
        console.log();
        if (req.body.user && req.body.pwd) {
          if (req.app.auth.check(req.body.user, req.body.pwd)) {
            req.session.connected = true;
            req.session.user = req.body.user;
            res.writeHead(302, {'Location': '/'});
            return res.end();
          } else {
            console.log(req.ip, '\tBad password for :', req.body.user);
            err = 'Bad login or password';
          }
        } else {
          err = 'Please enter your username and password';
        }
        
        res.render('auth', {
          error: err
        });
      }
    },
    logout: {
      path: '/logout',
      get: function(req, res) {
        req.session.connected = false;
        req.session.user = null;
        res.writeHead(302, {'Location': '/auth'});
        return res.end();
      }
    }
};