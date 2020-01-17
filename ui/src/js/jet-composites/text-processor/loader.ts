import "ojs/ojcore";
import { TextProcessor } from "./text-processor";
import "text!./text-processor.html"; 
import "text!./text-processor.json";
import "ojs/ojcomposite";

let oj: any = require("ojs/ojcore");
let view: any = require('text!./text-processor.html');
let metadata: any = require('text!./text-processor.json');

class Loader {

  constructor() {     
    oj.Composite.register('text-processor', {
      view: view,      
      viewModel: TextProcessor,
      metadata: JSON.parse(metadata)      
    });
  }
}

export = new Loader()