exports.config = {
    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.
    specs: [
        '../functional/*.js'
    ],

    // ----- More information for your tests ----
    //
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9998'
};