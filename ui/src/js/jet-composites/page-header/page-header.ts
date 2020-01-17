import  * as ko from "knockout";
import "ojs/ojcore";
import "ojs/ojresponsiveutils";
import * as ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";
import * as KnockoutTemplateUtils from "ojs/ojknockouttemplateutils";
import * as OffcanvasUtils from "ojs/ojoffcanvas";
import Router = require("ojs/ojrouter");

const oj = require("ojs/ojcore");
 
export class PageHeader {      

    toggleDrawer;
    drawerParams;
    appName: KnockoutObservable<string>;
    userLogin: KnockoutObservable<string>;
    smScreen;
    mdScreen;
    navDataProvider;
    KnockoutTemplateUtils = KnockoutTemplateUtils;
    router;

    constructor() {            
    }

    activated(context) {
        this.toggleDrawer = context.properties.toggleDrawer;
        this.navDataProvider = context.properties.navDataProvider;
        this.drawerParams = context.properties.drawerParams;
        
        // Header
        // Application Name used in Branding Area
        this.appName = ko.observable("Text Processor");

        // Media queries for repsonsive layouts
        const smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        const mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
        this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

        // Drawer
        // Close offcanvas on medium and larger screens
        this.mdScreen.subscribe(() => { OffcanvasUtils.close(this.drawerParams); });        

        this.router = Router.rootInstance;        
    }
        
    
}