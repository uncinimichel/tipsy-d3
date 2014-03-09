'use strict';


var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    _ = require('underscore'),
    GameOfLife = require('./lib/GameOfLife').GameOfLife;


/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');


// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
server.listen(config.port, function () {
    console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

io.on('connection', function (socket) {
    socket.on('tick', function () {
        if (!socket.gameOfLife) {
            return
        }
        var cells = socket.gameOfLife.iterate();
        console.log('Game tick');
        socket.emit('tick', {cells: cells, iteration: socket.gameOfLife.iteration});
    });
    socket.on('init', function (data) {
        var rows = data.rows,
            cols = data.cols,
            name = data.name;

        socket.gameOfLife = new GameOfLife();
        var grid = socket.gameOfLife.generateRandom(rows, cols, name || 'tipsyD3');

        console.log('Game init, iteration: ', socket.gameOfLife.iteration);
        socket.emit('init', {grid: grid});
    });
});

// Expose app
module.exports = app;