(function() {
  return {
    baseUrl: "./js/",
    appDir: "./build/",
    dir: "./release",
    paths: {
      knockout: 'libs/knockout/build/output/knockout-latest',  
      jquery: 'libs/jquery/dist/jquery.min',
      'jqueryui-amd': 'libs/jquery-ui/ui',  
      "promise": "libs/es6-promise/dist/es6-promise.min",
      "customElements": "libs/@webcomponents/custom-elements/custom-elements.min",
      hammerjs: 'libs/hammerjs/hammer.min',
      ojdnd: 'libs/@oracle/oraclejet/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
      ojs: "libs/@oracle/oraclejet/dist/js/libs/oj/min",
      //ojs: 'libs/@oracle/oraclejet/dist/js/libs/oj/debug',
      ojL10n: 'libs/@oracle/oraclejet/dist/js/libs/oj/ojL10n',
      ojtranslations: 'libs/@oracle/oraclejet/dist/js/libs/oj/resources',
      text: 'libs/requirejs-text/text',
      css: 'libs/require-css/css.min',
      signals: 'libs/signals/dist/signals.min',      
      'css-builder': 'libs/require-css/css-builder',
      'normalize': 'libs/require-css/normalize',
    },

    modules: [
      {
        name: "main"
      },      
      {
        name: "viewModels/dashboard",
        exclude: ["main"]
      },      
      {
        name: "viewModels/about",
        exclude: ["main", "viewModels/dashboard"]
      },
      {
        name: "viewModels/incidents",
        exclude: ["main", "viewModels/dashboard", "viewModels/about"]
      },      
      {
        name: "viewModels/customers",
        exclude: ["main", "viewModels/dashboard", "viewModels/about", "viewModels/incidents"]
      }
    ],
    //optimize: 'none',
    optimize: 'uglify',
    optimizeCss: 'standard',

    findNestedDependencies: true,
    inlineText: true
  };
})()
