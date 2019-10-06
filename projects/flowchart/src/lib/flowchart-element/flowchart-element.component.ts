import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { KonvaUtils } from '../utils/konvautils';
import { Node } from '../object/node';
import Konva from 'konva';
import { FlowchartGraphComponent } from '../flowchart-graph/flowchart-graph.component';
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
export class FlowchartElementComponent implements OnInit {

  @Input() flowGraph: FlowchartGraphComponent;

  constructor() { }

  ngOnInit() {

    let container = $('#element-container');
    Constants.NODE_TYPES.forEach(function (type, i) {

      let div = $('<div class="d-flex justify-content-center">' + this.getDivDraggable(type) +'</div>');
      container.append(div);

    }.bind(this));
    
    $( ".draggable" ).draggable({
      zIndex: 1000, 
      helper: "clone", 
      opacity: 0.55
    });
  }

  private getDivDraggable(type:string) {

    let text = "";
    switch(type) {
      case "S":
        text = "Punto de entrada";
        break;
      case "E":
        text = "Punto de término";
        break;
      case "N":
        text = "Enviar mensaje";
        break;
      case "C":
        text = "Evaluar condición";
        break;
    }

    return '<div id="shape' + type + '" class="draggable d-flex justify-content-center draggable-type-' + type + '" data-type="' + type + '">' + text + '</div>';
  }
}
