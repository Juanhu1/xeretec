import * as Composite from "ojs/ojcomposite";
import "text!./page-header.html";
import { PageHeader } from "./page-header";
import "text!./page-header.json";

const view = require("text!./page-header.html");
const metadata = require("text!./page-header.json");

class Loader {

  constructor() {     
    Composite.register('page-header', {
      view: view,
      viewModel: PageHeader,
      metadata: JSON.parse(metadata)
    });
  }
}

export = new Loader()