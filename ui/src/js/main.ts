import * as Bootstrap from "ojs/ojbootstrap";
import * as ko from "knockout";
import { AppController } from "./appController";
import Router = require("ojs/ojrouter");
import * as Logger from "ojs/ojlogger";
import "ojs/ojknockout";
import "ojs/ojmodule";
import "ojs/ojnavigationlist";
import "ojs/ojbutton";
import "ojs/ojtoolbar";
//import "css!../css/app";
//import "css!../css/demo-alta-site-min";

export class Main {
  
  constructor() {    
    Bootstrap.whenDocumentReady().then(
      function() {

        const appController = new AppController();        

        function init() {
          Router.sync().then(
            function () {   
              appController.loadModule();           
              // Bind your ViewModel for the content of the whole page body.
              ko.applyBindings(appController, document.getElementById('globalBody'));
            },
            function (error) {
              Logger.error('Error in root start: ' + error.message);
            }
          );
        }

        // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready
        // event before executing any code that might interact with Cordova APIs or plugins.
        if (document.body.classList.contains('oj-hybrid')) {
          document.addEventListener("deviceready", init);
        } else {
          init();
        }
      });
  }  
  
}
