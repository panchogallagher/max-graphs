import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { Node } from './object/node';
import { FlowchartGraphComponent } from './flowchart-graph/flowchart-graph.component';

@Component({
  selector: 'lib-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: [
    'bootstrap.min.css',
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
  }

  load(graph: Node[]) {
    this.flowchartgraph.load(graph);
  }

  export() : any {
    return this.flowchartgraph.export()
  }
}
