// Karma configuration
module.exports = function(config) {
    var customLaunchers = {
        'latest-chrome': {
            base: 'SauceLabs',
            browserName: 'chrome'
        },
        'latest-firefox': {
            base: 'SauceLabs',
            browserName: 'firefox'
        },
        'internet-explorer-9': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '9'
        },
        'ios-6': {
            base: 'SauceLabs',
            browserName: 'iphone',
            platform: "OS X 10.8",
            version: "6.0"
        },
        'android-4': {
            base: 'SauceLabs',
            device: 'motorola droid razr emulator',
            platform: "Linux",
            version: "4.0"
        }
    };

    config.set({
        frameworks: ['qunit'],
        files: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/modernizr/modernizr.js',
            'dist/circle-progress.js',
            'tests/test_utils.js',
            'tests/tests.js'
        ],
        sauceLabs: {
            testName: 'Unit Tests for jquery-circle-progress'
        },
        captureTimeout: 120000,
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['dots', 'saucelabs'],
        singleRun: true
    });
};
