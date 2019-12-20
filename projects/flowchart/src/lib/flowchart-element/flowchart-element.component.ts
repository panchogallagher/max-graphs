import { Component, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { Constants } from '../utils/constants';
import { Element } from '../object/element';
import { Setting } from '../object/setting';

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

  @Input() settings: Setting = null;

  constructor() { }

  ngAfterViewInit() {
    $(".draggable" ).draggable({
      zIndex: 1000, 
      helper: "clone", 
      opacity: 0.55
    });
  }

  public getNodeStyle(element:Element) {
    return {
      'background': element.style.boxBackgroundColor,
      'color': element.style.fontColor
    }
  }
}
