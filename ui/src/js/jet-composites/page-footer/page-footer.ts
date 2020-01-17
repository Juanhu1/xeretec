import  * as ko from "knockout";

// Footer
class FooterLink {
    name: string;
    linkId: string;
    linkTarget: string;
  
    constructor(name, id, linkTarget) {        
      this.name = name;
      this.linkId = id;
      this.linkTarget = linkTarget;    
    }
}
  
export class PageFooter {  

    footerLinks: KnockoutObservableArray<FooterLink>;

    constructor() {
        this.footerLinks = ko.observableArray([
            new FooterLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
            new FooterLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
            new FooterLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
            new FooterLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
            new FooterLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
        ]);
    }
    
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
    connected = function() {
    // Implement if needed
    }

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    disconnected = function() {
    // Implement if needed
    }

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    transitionCompleted = function() {
    // Implement if needed
    }
    
}

/*
* Returns a constructor for the ViewModel so that the ViewModel is constructed
* each time the view is displayed.  Return an instance of the ViewModel if
* only one instance of the ViewModel is needed.
*/
//export = Footer;