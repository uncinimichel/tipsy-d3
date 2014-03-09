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
                }
            },
            tickPromise = null;

        $scope.rows = 50;
        $scope.cols = 50;
        $scope.iteration = 0;
        $scope.speed = 1000;


        $scope.init = function () {
            $interval.cancel(tickPromise);
            $scope.isPlaying = false;
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
                $scope.iteration = data.iteration;
            });

        });

        $scope.$watch('speed', function () {
            if (!$scope.isPlaying){
                return
            }
            $interval.cancel(tickPromise);
            tickPromise = $interval(tickInterval.cb, $scope.speed);
        })

        $scope.play = function () {
            if ($scope.isPlaying) {
                $interval.cancel(tickPromise);
            } else {
                $interval.cancel(tickPromise);
                tickPromise = $interval(tickInterval.cb, $scope.speed);
            }
            $scope.isPlaying = !$scope.isPlaying;
        };

        window.socket = socket;
    }]);
