//var debug =true;
var debug =false;

var Minimatch = require('minimatch').Minimatch;
//const url = require('url');
//var baseUrl = "http://slc10wbf.us.oracle.com:8092";

module.exports = function(config) {
  var coverage=debug? [] : ['coverage'] ;
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    //basePath: config.myPath,    
    basePath: '../',
    // plugins to use
    plugins: [
      'karma-requirejs',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-jasmine',
      //'karma-html-detailed-reporter' ,
      //'karma-mocha-reporter'      
//      'karma-typescript'
    ],


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs' /*, 'karma-typescript' */],


    // list of files / patterns to load in the browser
    files: [
      {pattern: "node_modules/jquery/dist/jquery.min.js", included:false, "watching": false, "serving": true},
      {pattern: "node_modules/jquery-ui/ui/*.js", included:false, "watching": false, "serving": true},
      'test/test-main.js',
      {pattern: 'build/**/*.*',                                                                       included: false, "watching": true,  "serving": true},
      {pattern: 'node_modules/@oracle/oraclejet/dist/js/libs/oj/min/*.js',                            included: false, "watching": false, "serving": true},
      {pattern: "node_modules/@oracle/oraclejet/dist/js/libs/oj/debug/ojvalidation.js",               included: false, "watching": false, "serving": true},      
      {pattern: "node_modules/@oracle/oraclejet/dist/js/libs/oj/debug/ojvalidation-base.js",          included: false, "watching": false, "serving": true},      
      {pattern: "node_modules/@oracle/oraclejet/dist/js/libs/oj/debug/ojvalidation-datetime.js",      included: false, "watching": false, "serving": true},      
      {pattern: "node_modules/es6-promise/dist/es6-promise.min.js",                                   included: false, "watching": false, "serving": true},
      {pattern: "node_modules/knockout/build/output/knockout-latest.debug.js",                        included: false, "watching": false, "serving": true},
      {pattern: "node_modules/@webcomponents/custom-elements/custom-elements.min.js",                 included: false, "watching": false, "serving": true},
      {pattern: "node_modules/hammerjs/hammer.min.js",                                                included: false, "watching": false, "serving": true},
      {pattern: "node_modules//@oracle/oraclejet/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min.js",included: false, "watching": false, "serving": true},
      {pattern: "node_modules/@oracle/oraclejet/dist/js/libs/oj/debug/*.js",                          included: false, "watching": false, "serving": true},
      {pattern: "node_modules/@oracle/oraclejet/dist/js/libs/oj/ojL10n.js",                           included: false, "watching": false, "serving": true},
      {pattern: "node_modules/@oracle/oraclejet/dist/js/libs/oj/resources/**/*.js",                   included: false, "watching": false, "serving": true},
      {pattern: "node_modules/requirejs-text/text.js",                                                included: false, "watching": false, "serving": true},
      {pattern: "node_modules/require-css/css.min.js",                                                included: false, "watching": false, "serving": true},
//      {pattern: "node_modules/jasmine-ajax/lib/mock-ajax.js",                                         included: false, "watching": false, "serving": true},
      {pattern: "node_modules/signals/dist/signals.min.js",                                           included: false, "watching": false, "serving": true},
      {pattern: "node_modules/reflect-metadata/Reflect.js",                                           included: false, "watching": false, "serving": true},
      {pattern: "node_modules/@en/**/*.js",                                                            included: false, "watching": false, "serving": true}
    ],
    exclude: [
        //'libs/**/*.js',
        'build/js/ckeditor/**/*.js',
        'typings/**/*.js',
        "node_modules/**/*test.js",
        "node_modules/**/*spec.js"
    ],
    proxies: {
    //   "/libs/": "node_modules/"
    //       '/drc/api': '/build/js/testfiles',
    //   '/config' : '/build/js/testfiles'
    },

    client: {
      sourcePath : config.myPath,
      requireJsShowNoTimestampsError: '^(?!.*(^/base/libs/))'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
     //   'build/**/*.js' : coverage,        
        'build/js/base_classes/**/!(*spec|labels)*.js' : coverage,        
        'build/js/jet-composites/**/!(*spec|labels)*.js' : coverage,        
        'build/js/managers/**/!(*spec|labels)*.js' : coverage,        
        'build/js/utils/**/!(*spec|labels)*.js' : coverage,        
        'build/js/viewModels/**/!(*spec|labels)*.js' : coverage,        
//        '**/*.ts': ['karma-typescript', 'coverage']
        
    },
    // 
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage' /*, 'karma-typescript'*/],
    coverageReporter: {
      type : 'html',
      includeAllSources:true,
      dir : 'coverage/'
    },
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: [  /*'PhantomJS2'  ,*/ 'Chrome' ],
    //browsers: debug ? ['Chrome'] : ['ChromeHeadless'],
    browsers: debug ? ['Chrome'] : ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
        ChromeHeadlessNoSandbox: {
            base: 'ChromeHeadless',
            flags: [
                '--no-sandbox', // required to run without privileges in docker
              //  '--user-data-dir=/tmp/chrome-test-profile',
                '--headless',
                '--disable-gpu',
             //   '--user-data-dir=/tmp/chrome-test-profile',
                '--disable-setuid-sandbox',
                '--no-gpu',
                '--disable-software-rasterizer',
             //   '--dump-dom http://www.chromestatus.com',
             //   '--enable-logging', 
             //   '--v=1'

            ]
        }
    },
    browserDisconnectTimeout:20000,
    browserNoActivityTimeout:20000,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !debug,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1
  });
};
