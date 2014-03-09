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

        $scope.rows = 50;
        $scope.cols = 50;

        $scope.isPlaying = false;

        $scope.init = function () {
            $interval.cancel(tickPromise);
            $scope.name = 'Ciao';
            socket.emit('init', {rows: $scope.rows, cols: $scope.cols, name: $scope.name});
        };

        socket.on('init', function (data) {
            $scope.isInit = true;
            $scope.$broadcast('init', {
                rows: $scope.rows,
                cols: $scope.cols,
                cells: data.grid.cells
            });
            socket.on('tick', function (data) {
                $scope.$broadcast('cellsUpdate', {cells: data.cells});
            });

        });

        $scope.play = function () {
            if ($scope.isPlaying) {
                $interval.cancel(tickPromise);
            } else {
                $interval.cancel(tickPromise);
                tickPromise = $interval(tickInterval.cb, tickInterval.milli);
            }
            $scope.isPlaying = !$scope.isPlaying;
        };

        window.socket = socket;
    }]);
