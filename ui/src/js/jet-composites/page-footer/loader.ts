import * as Composite from "ojs/ojcomposite";
import "text!./page-footer.html";
import { PageFooter } from "./page-footer";
import "text!./page-footer.json";

const view = require("text!./page-footer.html");
const metadata = require("text!./page-footer.json");

class Loader {

  constructor() {     
    Composite.register('page-footer', {
      view: view,
      viewModel: PageFooter,
      metadata: JSON.parse(metadata)
    });
  }
}

export = new Loader()