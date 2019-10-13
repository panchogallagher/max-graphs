import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Constants } from '../utils/constants';

declare var $: any;

@Component({
  selector: 'flowchart-element',
  templateUrl: './flowchart-element.component.html',
  styleUrls: [
    '../bootstrap.min.css',
    './flowchart-element.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FlowchartElementComponent implements AfterViewInit {

  public nodeTypes: string[] = Object.keys(Constants.NODE_DEFINITION).filter(value => value !== 'I');

  constructor() { }

  ngAfterViewInit() {
    $(".draggable" ).draggable({
      zIndex: 1000, 
      helper: "clone", 
      opacity: 0.55
    });
  }

  public getNodeText(type:string) {
    return Constants.NODE_DEFINITION[type].title;
  }

  public getNodeIcon(type:string) {
    return Constants.NODE_DEFINITION[type].icon;
  }
}
