define(["require", "exports", "knockout", "ojs/ojmodule-element-utils", "ojs/ojknockouttemplateutils", "ojs/ojrouter", "ojs/ojarraydataprovider", "ojs/ojoffcanvas", "ojs/ojresponsiveutils", "ojs/ojmodule-element", "ojs/ojknockout", "jet-composites/page-footer/loader", "jet-composites/page-header/loader"], function (require, exports, ko, moduleUtils, KnockoutTemplateUtils, Router, ArrayDataProvider, OffcanvasUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var oj = require("ojs/ojcore");
    var AppController = /** @class */ (function () {
        function AppController() {
            var _this = this;
            this.KnockoutTemplateUtils = KnockoutTemplateUtils;
            this.getRenderer = oj.ResponsiveUtils.getRenderer;
            this.loadModule = function () {
                ko.computed(function () {
                    var name = _this.router.moduleConfig.name();
                    var viewPath = 'views/' + name + '.html';
                    var modelPath = 'viewModels/' + name;
                    var masterPromise = Promise.all([
                        moduleUtils.createView({ 'viewPath': viewPath }),
                        moduleUtils.createViewModel({ 'viewModelPath': modelPath })
                    ]);
                    masterPromise.then(function (values) {
                        _this.moduleConfig({ 'view': values[0], 'viewModel': values[1] });
                    });
                });
            };
            // Called by navigation drawer toggle button and after selection of nav drawer item    
            this.toggleDrawer = function () {
                return OffcanvasUtils.toggle(_this.drawerParams);
            };
            // Router setup
            this.router = Router.rootInstance;
            this.router.configure({
                'dashboard': { label: 'Dashboard', isDefault: true },
                'incidents': { label: 'Incidents' },
                'customers': { label: 'Customers' },
                'about': { label: 'About' }
            });
            Router.defaults['urlAdapter'] = new Router.urlParamAdapter();
            this.moduleConfig = ko.observable({ 'view': [], 'viewModel': null });
            // Navigation setup
            var navData = [
                {
                    name: 'Dashboard', id: 'dashboard',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
                },
                {
                    name: 'About', id: 'about',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'
                }
            ];
            this.navDataProvider = new ArrayDataProvider(navData, { keyAttributes: 'id' });
            this.drawerParams = {
                displayMode: 'push',
                selector: '#navDrawer',
                content: '#pageContent'
            };
            // Add a close listener so we can move focus back to the toggle button when the drawer closes
            document.getElementById('navDrawer').addEventListener("ojclose", function () {
                document.getElementById('drawerToggleButton').focus();
            });
        }
        return AppController;
    }());
    exports.AppController = AppController;
});
//# sourceMappingURL=appController.js.map