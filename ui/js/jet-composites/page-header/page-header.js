define(["require", "exports", "knockout", "ojs/ojresponsiveknockoututils", "ojs/ojknockouttemplateutils", "ojs/ojoffcanvas", "ojs/ojrouter", "ojs/ojcore", "ojs/ojresponsiveutils"], function (require, exports, ko, ResponsiveKnockoutUtils, KnockoutTemplateUtils, OffcanvasUtils, Router) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var oj = require("ojs/ojcore");
    var PageHeader = /** @class */ (function () {
        function PageHeader() {
            this.KnockoutTemplateUtils = KnockoutTemplateUtils;
        }
        PageHeader.prototype.activated = function (context) {
            var _this = this;
            this.toggleDrawer = context.properties.toggleDrawer;
            this.navDataProvider = context.properties.navDataProvider;
            this.drawerParams = context.properties.drawerParams;
            // Header
            // Application Name used in Branding Area
            this.appName = ko.observable("Text Processor");
            // Media queries for repsonsive layouts
            var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
            this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
            // Drawer
            // Close offcanvas on medium and larger screens
            this.mdScreen.subscribe(function () { OffcanvasUtils.close(_this.drawerParams); });
            this.router = Router.rootInstance;
        };
        return PageHeader;
    }());
    exports.PageHeader = PageHeader;
});
//# sourceMappingURL=page-header.js.map