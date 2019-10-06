import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../object/node';
import { FlowchartGraphComponent } from '../flowchart-graph/flowchart-graph.component';

@Component({
  selector: 'flowchart-setting',
  templateUrl: './flowchart-setting.component.html',
  styleUrls: [
    '../bootstrap.min.css',
    './flowchart-setting.component.css'
  ]
})
export class FlowchartSettingComponent implements OnInit {

  @Input() flowGraph: FlowchartGraphComponent;
  public node: Node;
  private original: Node;

  constructor() { }

  ngOnInit() {
    this.node = new Node();
  }

  public init(node: Node) {
    this.node = Object.assign({}, node);
    this.original = Object.assign({}, node);
  }

  public onApply() {
    console.log(this.node);
    this.flowGraph.updateNode(this.node);
  }

  public onRevert() {
    this.node = Object.assign({}, this.original);
    console.log(this.node, this.original);
  }
}
