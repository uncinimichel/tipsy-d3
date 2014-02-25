angular.module('graphsApp')
    .directive('d3GameOfLife', function () {
        var createDataModel = function (rows, cols, cells) {
            var gridWidth = 200,
                gridHeight = 100,
                square = true,
                gridItemWidth = gridWidth / 24 ,
                gridItemHeight = (square) ? gridItemWidth : gridHeight / 7 ,
                startX = gridItemWidth / 2 ,
                startY = gridItemHeight / 2 ,
                stepX = gridItemWidth ,
                stepY = gridItemHeight ,
                xpos = startX ,
                ypos = startY ,
                newValue = 0 ,
                count = 0,
                grid = [];

            for (var index_a = 0; index_a < rows; index_a++) {
                grid.push([]);
                for (var index_b = 0; index_b < cols; index_b++) {
                    newValue = Math.round(Math.random() * (100 - 1) + 1);
                    grid[index_a].push({
                        time: index_b,
                        value: cells[index_a][index_b].isAlive,
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
            return grid;
        };

        return {
            restrict: 'EA',
            require: '?ngModel',
            //Isolate the scope of this directive from the rest of the page : {} or scope: true; hierarchical relationship
            scope: {
                cells: '=',
                rows: '=',
                cols: '='
            },
            link: function (scope, element, attrs) {

                scope.$watch('cells', function () {
                    $('svg').remove();
                    //Creating data Model
                    var dataModel = createDataModel(scope.rows, scope.cols, scope.cells),
                        grid = d3.select(element[0]).append("svg")
                            .attr("width", '200px')
                            .attr("height", '200px')
                            .attr("class", "chart"),
                        row = grid.selectAll(".row")
                            .data(dataModel)
                            .enter().append("svg:g")
                            .attr("class", "row"),
                        col = row.selectAll(".cell")
                            .data(function (d) {
                                return d;
                            })
                            .enter().append("svg:rect")
                            .attr("class", "cell")
                            .attr("x", function (d) {
                                return d.x;
                            })
                            .attr("y", function (d) {
                                return d.y;
                            })
                            .attr("width", function (d) {
                                return d.width;
                            })
                            .attr("height", function (d) {
                                return d.height;
                            })
                            .attr("live", function (d) {
                                return d.value;
                            })
//                        .on('mouseover', function () {
//                            d3.select(this)
//                                .style('fill', '#0F0');
//                        })
//                        .on('mouseout', function () {
//                            d3.select(this)
//                                .style('fill', '#FFF');
//                        })
                            .on('click', function () {
                                console.log('Object clicked: ', d3.select(this));
                                console.log('data: ', d3.select(this).data());
                            })
                            .style("fill", function (d) {
                                return d.value ? '#0F0' : '#FFF';
                            })
                            .style("stroke", '#555');
                })

            }
        }
    });