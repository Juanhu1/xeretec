define(["require", "exports", "ojs/ojbootstrap", "knockout", "./appController", "ojs/ojrouter", "ojs/ojlogger", "ojs/ojknockout", "ojs/ojmodule", "ojs/ojnavigationlist", "ojs/ojbutton", "ojs/ojtoolbar"], function (require, exports, Bootstrap, ko, appController_1, Router, Logger) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import "css!../css/app";
    //import "css!../css/demo-alta-site-min";
    var Main = /** @class */ (function () {
        function Main() {
            Bootstrap.whenDocumentReady().then(function () {
                var appController = new appController_1.AppController();
                function init() {
                    Router.sync().then(function () {
                        appController.loadModule();
                        // Bind your ViewModel for the content of the whole page body.
                        ko.applyBindings(appController, document.getElementById('globalBody'));
                    }, function (error) {
                        Logger.error('Error in root start: ' + error.message);
                    });
                }
                // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready
                // event before executing any code that might interact with Cordova APIs or plugins.
                if (document.body.classList.contains('oj-hybrid')) {
                    document.addEventListener("deviceready", init);
                }
                else {
                    init();
                }
            });
        }
        return Main;
    }());
    exports.Main = Main;
});
//# sourceMappingURL=main.js.map