/**
 * The homepage
 */
module.exports = {
    index: {
        path: '/',
        get: function(req, res) {
            res.render('index');
        }
    }
};