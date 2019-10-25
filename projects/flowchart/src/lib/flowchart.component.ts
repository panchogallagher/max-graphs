import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { Node } from './object/node';
import { FlowchartGraphComponent } from './flowchart-graph/flowchart-graph.component';
import { Graph } from './object/graph';

declare var $: any;

@Component({
  selector: 'lib-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: [
    'bootstrap.min.css',
    'select2-bootstrap.min.css',
    './flowchart.component.css'
  ]
})
export class FlowchartComponent implements AfterViewInit {

  @ViewChild("flowchartgraph", {static: false})
  flowchartgraph : FlowchartGraphComponent;

  @Output() onClickConfig: EventEmitter<Node> = new EventEmitter();

  constructor() { }

  ngAfterViewInit() {
    this.flowchartgraph.onClickConfig = this.onClickConfig;
    $("<style type='text/css'>.select2, .select2-container, .select2-results, .select2-results__option {font-size: 12px!important;}</style>").appendTo("head");
    $("<style type='text/css'>.select2-results__options {overflow-x: hidden;}</style>").appendTo("head");
  }

  load(graph: Graph) {
    this.flowchartgraph.load(graph);
  }

  export() : Graph {
    return this.flowchartgraph.export()
  }
}
