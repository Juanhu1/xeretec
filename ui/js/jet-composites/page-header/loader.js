define(["require", "exports", "ojs/ojcomposite", "./page-header", "text!./page-header.html", "text!./page-header.json"], function (require, exports, Composite, page_header_1) {
    "use strict";
    var view = require("text!./page-header.html");
    var metadata = require("text!./page-header.json");
    var Loader = /** @class */ (function () {
        function Loader() {
            Composite.register('page-header', {
                view: view,
                viewModel: page_header_1.PageHeader,
                metadata: JSON.parse(metadata)
            });
        }
        return Loader;
    }());
    return new Loader();
});
//# sourceMappingURL=loader.js.map