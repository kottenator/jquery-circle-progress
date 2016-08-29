// Karma configuration
module.exports = function(config) {
  var customLaunchers = {
    'Latest Chrome on Windows 10': {
      base: 'SauceLabs',
      platform: 'Windows 10',
      browserName: 'chrome',
      version: 'latest'
    },
    'Latest Firefox on Windows 10': {
      base: 'SauceLabs',
      platform: 'Windows 10',
      browserName: 'firefox',
      version: 'latest'
    },
    'IE9 on Windows 7': {
      base: 'SauceLabs',
      platform: 'Windows 7',
      browserName: 'internet explorer',
      version: '9'
    },
    'Latest Safari on OS X 10.11': {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'safari',
      version: 'latest'
    },
    'iPhone emulator': {
      base: 'SauceLabs',
      platform: "OS X 10.11",
      browserName: 'iphone',
      version: "8.1"
    },
    'Android emulator': {
      base: 'SauceLabs',
      platform: 'Linux',
      browserName: 'android',
      version: '5.0'
    }
  };

  config.set({
    frameworks: ['qunit'],
    files: [
      {pattern: 'tests/images/circle.png', served: true, watched: false, included: false},
      'node_modules/jquery/dist/jquery.min.js',
      'dist/circle-progress.js',
      'tests/test_utils.js',
      'tests/tests.js'
    ],
    sauceLabs: {
      testName: 'Unit tests for jquery-circle-progress'
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'saucelabs'],
    singleRun: true
  });
};
