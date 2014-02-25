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

var games = [];
io.on('connection', function (socket) {
    socket.gameOfLife = new GameOfLife();
    games.push(socket.gameOfLife);
    socket.on('tick', function () {
        var cells = socket.gameOfLife.iteration();
        socket.emit('tick', {cells: cells});
    });
    socket.on('init', function (data) {
        var rows = data.rows,
            cols = data.cols,
            name = data.name,
            grid = socket.gameOfLife.generateRandom(rows, cols, name || 'tipsyD3');

        socket.emit('init', {grid: grid});
    });

    socket.on('print', function () {
        _.each(games, function (game) {
            console.log('###############');
            game.drawCells(console.log)
            console.log('###############');
        })
    })
});

// Expose app
module.exports = app;