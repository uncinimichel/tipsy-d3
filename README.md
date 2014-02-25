#

### System Requirements

In order to run tipsy-d3, you will need to install:

* Nodejs >= v0.10.*
* ruby >= 2.*

### NodeJS Modules

The following global NodeJS modules are required:

* grunt-cli
* bower



### Post checkout steps

`./setup-hooks.sh`

`./hooks/post-receive`

### Grunt commands

#### Running the application

`grunt serve` - Run and launch the application

#### Tests

`grunt test` - run the full test suite (unit, functional and end to end)

`grunt karma` - run the unit tests

`grunt functional` - run the functional tests

`grunt e2e` - run the end to end tests

