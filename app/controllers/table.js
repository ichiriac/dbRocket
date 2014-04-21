/**
 * The tables CRUD manager
 */
module.exports = {
  list: {
    params: {
      'name': /^[a-zA-Z0-9_]+$/
    },
    path: '/table/:name',
    get: function(req, res) {
      res.render('table/list', {
        table: req.params.name,
        title: 'Listing ' + req.params.name
      });
    }
  }
};