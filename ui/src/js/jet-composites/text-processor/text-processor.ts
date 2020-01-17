import * as ko from 'knockout';
import "css!./text-processor";
import "ojs/ojfilepicker" ;

export class TextProcessor {            

    fileNames = ko.observable();
    totalNumberOfWords = ko.observable("");
    totalNumberOfChars = ko.observable("");
    avarageWordLength = ko.observable("");

    constructor(context) { }     
    activated(context) { }
    disconnected(context) {}
    
    invalidMessage = ko.observable('');
    invalidListener = (event) => {
        this.fileNames([]);
        this.invalidMessage("{severity: '" + event.detail.messages[0].severity + "', summary: '" + event.detail.messages[0].summary + "'}");
        var promise = event.detail.until;
        if (promise) {
            promise.then(function(){
            this.invalidMessage('');
            });
        }
    };
  
    acceptStr = ko.observable('text/*');
    acceptArr = ko.pureComputed( () => {
        var accept = this.acceptStr();
        return accept ? accept.split(',') : [];
    });
  
    selectListener = (event, d) => { 
        debugger;
        this.invalidMessage('');
        this.fileNames(event.detail.files);
        AJAXSubmit(d, (response) => {
            debugger;
            this.totalNumberOfWords = response.totalNumberOfWords;
        });
    };
}
