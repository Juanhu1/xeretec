define(["require", "exports", "knockout", "css!./text-processor", "ojs/ojfilepicker"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextProcessor = /** @class */ (function () {
        function TextProcessor(context) {
            var _this = this;
            this.fileNames = ko.observable();
            this.totalNumberOfWords = ko.observable("");
            this.totalNumberOfChars = ko.observable("");
            this.avarageWordLength = ko.observable("");
            this.invalidMessage = ko.observable('');
            this.invalidListener = function (event) {
                _this.fileNames([]);
                _this.invalidMessage("{severity: '" + event.detail.messages[0].severity + "', summary: '" + event.detail.messages[0].summary + "'}");
                var promise = event.detail.until;
                if (promise) {
                    promise.then(function () {
                        this.invalidMessage('');
                    });
                }
            };
            this.acceptStr = ko.observable('text/*');
            this.acceptArr = ko.pureComputed(function () {
                var accept = _this.acceptStr();
                return accept ? accept.split(',') : [];
            });
            this.selectListener = function (event, d) {
                debugger;
                _this.invalidMessage('');
                _this.fileNames(event.detail.files);
                AJAXSubmit(d, function (response) {
                    debugger;
                    _this.totalNumberOfWords = response.totalNumberOfWords;
                });
            };
        }
        TextProcessor.prototype.activated = function (context) { };
        TextProcessor.prototype.disconnected = function (context) { };
        return TextProcessor;
    }());
    exports.TextProcessor = TextProcessor;
});
//# sourceMappingURL=text-processor.js.map