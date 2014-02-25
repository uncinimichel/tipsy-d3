//So it is global
_ = require('underscore');

var sinon = require('sinon'),
    should = require('should'),
    GameOfLife = require('../../lib/GameOfLife').GameOfLife;

describe('Game of life', function () {
    describe('#generateRandom', function () {
        before(function () {
            this.gameOfLife = new GameOfLife();
            sinon.stub(Math, 'floor').returns(1);
        });
        after(function () {
            Math.floor.restore();
        });
        it('should return a grid with random cels', function () {
            var rows = 10,
                cols = 10,
                grid = null;

            try {
                this.gameOfLife.generateRandom();
            } catch (ex) {
                ex.message.should.be.exactly('Try to generate random with no rows or cols');
            }

            grid = this.gameOfLife.generateRandom(rows, cols, 'a name');

            grid.should.have.property('rows', 10);
            grid.should.have.property('cols', 10);
            grid.should.have.property('namess', 'a name');

            _.times(rows, function (i) {
                _.times(cols, function (j) {
                    (grid.cells[i][j].isAlive).should.be.exactly(true);
                });
            });


        })
    });
    describe('#iteration', function () {
        before(function () {
            this.gameOfLife = new GameOfLife();
            this.conf = {};
            this.conf.block = [
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: true},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: true},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ]
            ]
            this.conf.blockExpect = this.conf.block;
            this.conf.another = [
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: true},
                    {isAlive: true},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: true},
                    {isAlive: true},
                    {isAlive: false},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ]
            ];
            this.conf.anotherExpect = [
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: false},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: true},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ],
                [
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false},
                    {isAlive: false}
                ]
            ];
        })
        it('should return a grid with the next iteration', function () {
            var cells = null;
            this.gameOfLife.generateFromGrid(this.conf.block, 4, 4, 'Block');
            cells = this.gameOfLife.iteration();
            cells.should.containDeep(this.conf.blockExpect);
            cells = this.gameOfLife.iteration();
            cells.should.containDeep(this.conf.blockExpect);
            cells = this.gameOfLife.iteration();
            cells.should.containDeep(this.conf.blockExpect);
            cells = this.gameOfLife.iteration();
            cells.should.containDeep(this.conf.blockExpect);

            this.gameOfLife.generateFromGrid(this.conf.another, 6, 6, 'Another');

            cells = this.gameOfLife.iteration();
            cells.should.containDeep(this.conf.anotherExpect);
            cells = this.gameOfLife.iteration();
            cells.should.containDeep(this.conf.another);
            cells = this.gameOfLife.iteration();
            cells.should.containDeep(this.conf.anotherExpect);
            cells = this.gameOfLife.iteration();
            cells.should.containDeep(this.conf.another);
        })
    });
})