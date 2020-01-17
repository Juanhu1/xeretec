var allTestFiles = [] ;
var TEST_REGEXP = /spec\.js$/i
var TEST_REGEXP_UTIL = /(utils(\\|\/).*\.spec)\.js$/i

// Get a list of all the test files to include
Object.keys(window["__karma__"].files).forEach(function (file) {
  if (TEST_REGEXP_UTIL.test(file)) {
    //debugger;
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    //debugger;
    var normalizedTestModule = file.replace(/^\/build\/|\.js$/g, '');
    console.log("normalizedModule: ", normalizedTestModule) ;
    allTestFiles.push(normalizedTestModule);
  }
});
Object.keys(window["__karma__"].files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    //debugger;
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    //debugger;
    var normalizedTestModule = file.replace(/^\/build\/|\.js$/g, '');
    console.log("normalizedModule: ", normalizedTestModule) ;
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,

  paths: {
    "knockout": "./node_modules/knockout/build/output/knockout-latest.debug", 
    jquery: './node_modules/jquery/dist/jquery.min',
    'jqueryui-amd': './node_modules/jquery-ui/ui',  
    "promise": "./node_modules/es6-promise/dist/es6-promise.min",
    "customElements": "./node_modules/@webcomponents/custom-elements/custom-elements.min",    
    hammerjs: './node_modules/hammerjs/hammer.min',
    ojdnd: './node_modules/@oracle/oraclejet/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
    ojs: "./node_modules/@oracle/oraclejet/dist/js/libs/oj/debug",
    ojvalidation:"./node_modules/@oracle/oraclejet/dist/js/libs/oj/debug/ojvalidation",
  //  "ojvalidationbase":"./node_modules/@oracle/oraclejet/dist/js/libs/oj/debug/ojvalidation-base",
 //   "ojvalidationdatetime":"./node_modules/@oracle/oraclejet/dist/js/libs/oj/debug/ojvalidation-datetime",
    //"ojs/ojvalidationdatetime": "./node_modules/@oracle/oraclejet/dist/js/libs/oj/debug/ojvalidation-datetime",
    ojL10n: './node_modules/@oracle/oraclejet/dist/js/libs/oj/ojL10n',
    ojtranslations: './node_modules/@oracle/oraclejet/dist/js/libs/oj/resources',
    text: './node_modules/requirejs-text/text',
    css: './node_modules/require-css/css.min',
    signals: './node_modules/signals/dist/signals.min',
    ckeditor: 'ckeditor/ckeditor',
    jqueryadapter: 'ckeditor/adapters/jquery',
    'reflect-metadata': './node_modules/reflect-metadata/Reflect',
//    'jajax': './node_modules/jasmine-ajax/lib/mock-ajax',
    'ENBASE':'./node_modules/@en/en-base-lib/lib',
    'ENBASE-EXT':'./node_modules/@en/en-base-ext-lib/lib'
  },

  config: {
    ojL10n: {
      merge: {
        'ojtranslations/nls/ojtranslations': 'build/'+ 
            window["__karma__"].config.sourcePath +
            (window["__karma__"].config.sourcePath.length>0 ? '/' :'' ) +
            'js/resources/nls/labels'
      },
      locale: 'en'
    },
    text: {
      useXhr: function (url, protocol, hostname, port) {
        // Allow cross-domain requests to get Text resources
        // Remote server must set Access-Control-Allow-Origin header
        return true;
      }
    }
  },
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jquery': {
      exports: '$'
    }
  },

  // we have to kickoff jasmine, as it is asynchronous
  callback: window["__karma__"].start
  
})

require(["ojvalidation"], function() {

});
/*
require(["ojvalidationbase"], function() {

});


require(["ojvalidationdatetime"], function() {

});
*/
