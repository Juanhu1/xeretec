define(["require", "exports", "ojs/ojtranslation", "../jet-composites/text-processor/loader"], function (require, exports, Translations) {
    "use strict";
    var DashboardViewModel = /** @class */ (function () {
        function DashboardViewModel() {
            // Below are a set of the ViewModel methods invoked by the oj-module component.
            // Please reference the oj-module jsDoc for additional information.
            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * This method might be called multiple times - after the View is created
             * and inserted into the DOM and after the View is reconnected
             * after being disconnected.
             */
            this.connected = function () {
                // Implement if needed
            };
            /**
             * Optional ViewModel method invoked after the View is disconnected from the DOM.
             */
            this.disconnected = function () {
                // Implement if needed
            };
            /**
             * Optional ViewModel method invoked after transition to the new View is complete.
             * That includes any possible animation between the old and the new View.
             */
            this.transitionCompleted = function () {
                // Implement if needed
            };
            this.helloLabel = Translations.getTranslatedString('mainLbls.helloLbl', ["Dashboard"]);
        }
        return DashboardViewModel;
    }());
    return DashboardViewModel;
});
//# sourceMappingURL=dashboard.js.map