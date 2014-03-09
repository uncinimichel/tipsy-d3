'use strict';

(function (exports, _) {
    var gameOfLife = function () {
        this.grid = {
            name: null,
            rows: 0,
            cols: 0,
            cells: []
        }
        this.iteration = 0;
    };

    gameOfLife.prototype = {
        drawCells: function (output) {
            var rows = this.grid.rows,
                cols = this.grid.cols,
                out = '\n';

            _.times(rows, function (i) {
                _.times(cols, function (j) {
                    out += this.grid.cells[i][j].isAlive ? 1 : 0;
                    out += ' ';
                }, this);
                out += '\n';
            }, this);

            output(out);
        },
        generateFromGrid: function (cells, rows, cols, name) {
            if (!_.isNumber(rows) || !_.isNumber(cols)) {
                throw new Error('Try to generate random with no rows or cols');
            }
            this.grid.name = name;
            this.grid.rows = rows;
            this.grid.cols = cols;
            this.grid.cells = cells;
            return this.grid.cells;
        },
        generateRandom: function (rows, cols, name) {
            this.grid.name = name;
            this.grid.rows = rows;
            this.grid.cols = cols;
            this.grid.cells = [];

            _.times(rows, function () {
                var row = [];
                this.grid.cells.push(row);
                _.times(cols, function () {
                    row.push({
                        isAlive: Math.floor(Math.random() * 2) === 1
                    });
                }, this);
            }, this);
            return this.grid;
        },
        iterate: function () {
            var newGen = [],
                oldGen = this.grid.cells,
                rows = this.grid.rows,
                cols = this.grid.cols;

            _.times(rows, function (i) {
                var newRow = [];
                newGen.push(newRow);
                _.times(cols, function (j) {
                    var cell = oldGen[i][j],
                        newCell = {
                            isAlive: this._evaluateCell(cell, i, j)
                        };

                    newRow.push(newCell);
                }, this);
            }, this);

            this.iteration++;
            this.grid.cells = newGen;
            return newGen;
        },
        _getNeighbor: function (m, n) {
            var neighbors = [],
                im1 = m - 1,
                i = m,
                ip1 = m + 1,
                jm1 = n - 1,
                j = n,
                jp1 = n + 1,
                size = this.grid.cells.length;


            // NO THIS it is itself: this.grid.cells[][];
            if (im1 >= 0 && jm1 >= 0) {
                neighbors.push(this.grid.cells[im1][jm1]);
            }
            if (im1 >= 0) {
                neighbors.push(this.grid.cells[im1][j]);
            }
            if (im1 >= 0 && jp1 < size) {
                neighbors.push(this.grid.cells[im1][jp1]);
            }

            if (jm1 >= 0) {
                neighbors.push(this.grid.cells[i][jm1]);
            }
            if (jp1 < size) {
                neighbors.push(this.grid.cells[i][jp1]);
            }

            if (ip1 < size && jm1 >= 0) {
                neighbors.push(this.grid.cells[ip1][jm1]);
            }
            if (ip1 < size) {
                neighbors.push(this.grid.cells[ip1][j]);
            }
            if (ip1 < size && jp1 < size) {
                neighbors.push(this.grid.cells[ip1][jp1]);
            }


            return neighbors;

        },
        /**
         *
         *
         *
         * @param cell
         * @param i
         * @param j
         * @returns true alive, false dead
         * @private
         */
        _evaluateCell: function (cell, i, j) {
            var neighbors = this._getNeighbor(i, j),
                alives = 0,
                deads = 0;

            _.each(neighbors, function (neighbor) {
                neighbor.isAlive ? alives++ : deads++;
            });

            if (alives < 2 || alives > 3) {
                return false;
            } else if (alives == 3) {
                return true;
            } else if (alives == 2) {
                return cell.isAlive;
            }
        }

    };
    exports.GameOfLife = gameOfLife;
})(exports, require('underscore'));
