/*global module */
module.exports = function ( config ) {
  'use strict';

  var files = [
    'components/angular/angular.js',
    'components/angular-mocks/angular-mocks.js',
    'src/storageprovider.js',
    'test/storageprovider.spec.js'
  ];

  config.set({
    files : files,
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['Chrome', 'Firefox'],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
};
