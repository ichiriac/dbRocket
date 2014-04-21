var _ = require('lodash');

// Load app configuration

// _.assign combines the two objects into a bigger object.
module.exports = _.assign(
    // configuration variables that will be the same across all environments
    require(__dirname + '/env/all.js'),
    // configuration variables that are environment specific
    require(__dirname + '/env/' + process.env.NODE_ENV + '.js') || {}
);
