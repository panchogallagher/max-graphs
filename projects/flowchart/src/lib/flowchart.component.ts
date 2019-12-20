import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { Node } from './object/node';
import { FlowchartGraphComponent } from './flowchart-graph/flowchart-graph.component';
import { Graph } from './object/graph';
import { Setting } from './object/setting';
import { Constants } from './utils/constants';

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
export class FlowchartComponent implements OnInit, AfterViewInit {

  @ViewChild("flowchartgraph", {static: false})
  flowchartgraph : FlowchartGraphComponent;

  @Input() settings: Setting = null;
  @Output() onClickConfig: EventEmitter<Node> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.settings = Object.assign({}, Constants.DEFAULT_SETTINGS, this.settings);

    if (this.settings.width < Constants.DEFAULT_SETTINGS.width) {
      this.settings.width = Constants.DEFAULT_SETTINGS.width;
      console.info("[Flowchart] Width can't be lesser than " + Constants.DEFAULT_SETTINGS.width);
    }

    if (this.settings.height < Constants.DEFAULT_SETTINGS.height) {
      this.settings.height = Constants.DEFAULT_SETTINGS.height;
      console.info("[Flowchart] Height can't be lesser than " + Constants.DEFAULT_SETTINGS.height);
    }
  }

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
