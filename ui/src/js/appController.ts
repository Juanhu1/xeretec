import * as ko from "knockout";
import * as moduleUtils from "ojs/ojmodule-element-utils";
import * as KnockoutTemplateUtils from "ojs/ojknockouttemplateutils";
import Router = require("ojs/ojrouter");
import "ojs/ojresponsiveutils";
import * as ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as OffcanvasUtils from "ojs/ojoffcanvas";
import "ojs/ojmodule-element";
import "ojs/ojknockout";
import "jet-composites/page-footer/loader";
import "jet-composites/page-header/loader";

const oj = require("ojs/ojcore");

export class AppController {
  
  router;
  navDataSource;
  drawerParams;
  appName: KnockoutObservable<string>;
  userLogin: KnockoutObservable<string>;
  KnockoutTemplateUtils = KnockoutTemplateUtils;
  moduleConfig;
  navDataProvider;
  getRenderer = oj.ResponsiveUtils.getRenderer;

  constructor() {        

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
    const navData = [
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
      document.getElementById('drawerToggleButton').focus()
    });    
    
  }

  loadModule = () => {
    ko.computed(() => {
      const name = this.router.moduleConfig.name();
      const viewPath = 'views/' + name + '.html';
      const modelPath = 'viewModels/' + name;
      const masterPromise = Promise.all([
        moduleUtils.createView({'viewPath':viewPath}),
        moduleUtils.createViewModel({'viewModelPath':modelPath})
      ]);
      masterPromise.then(
        (values) => {
          this.moduleConfig({'view':values[0],'viewModel':values[1]});
        }
      );
    });
    
  }

  // Called by navigation drawer toggle button and after selection of nav drawer item    
  toggleDrawer = () => {
    return OffcanvasUtils.toggle(this.drawerParams);
  }
  
}