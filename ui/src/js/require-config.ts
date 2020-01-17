
let getURLParameter = function(param: string) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] == param) {
        return pair[1];
      }
    }
    return '';
  };
  let langCode: string = getURLParameter('lang');
  if (!langCode) langCode = 'en';
  
  let paths: any = {
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
  };
  
  require.config({
    paths: paths,  
    waitSeconds: 20,
    config: {
      ojL10n: {
        merge: {
          'ojtranslations/nls/ojtranslations': 'resources/nls/labels'
        },
        locale: langCode
      },
      text: {
        useXhr: function(url, protocol, hostname, port) {
          // Allow cross-domain requests to get Text resources
          // Remote server must set Access-Control-Allow-Origin header
          return true;
        }
      }
    }
  });
  
  require(["main"], function(main) {      
    new main.Main();
  });
  