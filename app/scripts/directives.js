angular.module('graphsApp')
    .directive('d3GameOfLife', function () {
        'use strict';
        var createGrid = function (rows, cols, cells, element) {
                //clear any reference of an old grid
                d3.select("svg").remove();
                var dataModel = _createDataModel(rows, cols, cells),
                    grid = d3.select(element[0]).append('svg')
//                        .attr('width', '600px')
//                        .attr('height', '600px')
                        .attr('class', 'chart'),
                    row = grid.selectAll('.row')
                        .data(dataModel)
                        .enter().append('svg:g')
                        .attr('class', 'row'),
                    col = row.selectAll('.cell')
                        .data(function (d) {
                            return d;
                        })
                        .enter().append('svg:rect')
                        .attr('class', 'cell')
                        .attr('x', function (d) {
                            return d.x;
                        })
                        .attr('y', function (d) {
                            return d.y;
                        })
                        .attr('width', function (d) {
                            return d.width;
                        })
                        .attr('height', function (d) {
                            return d.height;
                        })
                        .attr('live', function (d) {
                            return d.isAlive;
                        })
//                        .on('mouseover', function () {
//                            d3.select(this)
//                                .style('fill', '#0F0');
//                        })
//                        .on('mouseout', function () {
//                            d3.select(this)
//                                .style('fill', '#FFF');
//                        })
//                        .on('click', function () {
//                            console.log('Object clicked: ', d3.select(this));
//                            console.log('data: ', d3.select(this).data());
//                        })
                        .style('fill', function (d) {
                            return d.isAlive ? '#0F0' : '#FFF';
                        })
                        .style('stroke', '#555');
            },
            _createDataModel = function (rows, cols, cells) {
                var gridItemWidth = 10,
                    gridItemHeight = 10,
                    startX = gridItemWidth / 2 ,
                    startY = gridItemHeight / 2 ,
                    stepX = gridItemWidth ,
                    stepY = gridItemHeight ,
                    xpos = startX ,
                    ypos = startY ,
                    newValue = 0 ,
                    count = 0,
                    model = [];

                for (var indexA = 0; indexA < rows; indexA++) {
                    model.push([]);
                    for (var indexB = 0; indexB < cols; indexB++) {
                        newValue = Math.round(Math.random() * (100 - 1) + 1);
                        model[indexA].push({
                            time: indexB,
                            isAlive: cells[indexA][indexB].isAlive,
                            width: gridItemWidth,
                            height: gridItemHeight,
                            x: xpos,
                            y: ypos,
                            count: count
                        });
                        xpos += stepX;
                        count += 1;
                    }
                    xpos = startX;
                    ypos += stepY;
                }
                return model;
            },
            updateGrid = function (cells) {
                var grid = d3.select('svg');

                if (!grid) {
                    return
                }

                //update
                var rows = grid.selectAll('.row');
                rows.selectAll('.cell').style('fill', function (oldData, i, j) {
                    return cells[i][j].isAlive ? '#0F0' : '#FFF';
                });

            }

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                scope.$on('init', function (scope1, init) {
                    createGrid(init.rows, init.cols, init.cells, element);
                    scope.$on('cellsUpdate', function (scope2, data) {
                        updateGrid(data.cells);
                    });
                });

            }
        };
    });