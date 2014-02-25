var chai = require('chai');

var expect = chai.expect;

module.exports = function () {
    this.Given(/^I am on the homepage$/, function (next) {
        browser.get('/');

        next();
    });

    this.Then(/^I see the text (.*)$/, function (text, next) {
        browser.findElement(By.tagName('h3')).getText().then(function (actualText) {
            expect(actualText).to.equal(text);
            next();
        });

    });
};