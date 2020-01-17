define(["require", "exports", "./text-processor", "ojs/ojcore", "text!./text-processor.html", "text!./text-processor.json", "ojs/ojcomposite"], function (require, exports, text_processor_1) {
    "use strict";
    var oj = require("ojs/ojcore");
    var view = require('text!./text-processor.html');
    var metadata = require('text!./text-processor.json');
    var Loader = /** @class */ (function () {
        function Loader() {
            oj.Composite.register('text-processor', {
                view: view,
                viewModel: text_processor_1.TextProcessor,
                metadata: JSON.parse(metadata)
            });
        }
        return Loader;
    }());
    return new Loader();
});
//# sourceMappingURL=loader.js.map