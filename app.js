/**
 * rocketDb - put a rocket on your backoffice
 * The simplest way to generate a lightweight standalone CRUD app
 * @author I. CHIRIAC
 * @license MIT
 */

// require framework libs
console.log('\n\n');
console.log('                          ||    /\\ ');
console.log('                          ||   /  \\ ');
console.log('                          ||  / DB \\ ');
console.log('                          || /______\\ ');
console.log('                          |||        | ');
console.log('                         |  | ROCKET | ');
console.log('                         |  |        | ');
console.log('                         |__|________| ');
console.log('                         |___________| ');
console.log('                         |  |        | ');
console.log('                         |__|   ||   |\\ ');
console.log('                          |||   ||   | \\ ');
console.log('                         /|||   ||   |  \\ ');
console.log('                        /_|||...||...|___\\ ');
console.log('                          |||::::::::| ');
console.log('                          || \\::::::/ ');
console.log('                          ||  ||__|| ');
console.log('           _______________||____||________________ ');

console.log('\n                     3..2..1.. Launching !\n');
var express     = require('express');

// Load Configurations
var env             = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log('... boostrap mode [' + env + ']');

function config() { return require('./config/config'); }
function auth() { return require('./core/auth'); }
function db() { return require('./core/database'); }

// create the app instance
console.log('... starting express app');
var app = express();
app.config = config();
app.db = db();

// Initialize Express
require('./core/express')(app);

// Initialize Routes
require('./core/routes')(app);

//Start the app by listening on <port>
var port = process.env.PORT || app.config.port;
app.listen(port);
console.log('... app is launched at http://localhost:' + port + '/');

//expose app
exports = module.exports = app;