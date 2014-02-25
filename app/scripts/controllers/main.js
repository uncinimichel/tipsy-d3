'use strict';

angular.module('graphsApp')
    .controller('MainCtrl', function ($scope, $http) {
        $http.get('/api/awesomeThings').success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });
    })
    .controller('GameOfLifeCtrl', ['$scope', 'socket', '$interval', function ($scope, socket, $interval) {
        var tickInterval = {
                cb: function () {
                    socket.emit('tick');
                },
                milli: 1000
            },
            tickPromise = null;

        socket.on('init', function (data) {
            $scope.grid = data.grid;
            $scope.cells = data.grid.cells;
            socket.on('tick', function (data) {
                $scope.cells = data.cells;
            });

        })

        $scope.play = function () {
            $interval.cancel(tickPromise);
            tickPromise = $interval(tickInterval.cb, tickInterval.milli);
        };
        $scope.pause = function () {
            $interval.cancel(tickPromise);
        };
        $scope.init = function () {
            $interval.cancel(tickPromise);
            $scope.rows = 20;
            $scope.cols = 20;
            $scope.name = 'Ciao';
            socket.emit('init', {rows: $scope.rows, cols: $scope.cols, name: $scope.name});
        };

        window.socket = socket;
    }]);
