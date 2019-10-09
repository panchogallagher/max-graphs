import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../object/node';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'flowchart-setting',
  templateUrl: './flowchart-setting.component.html',
  styleUrls: [
    '../bootstrap.min.css',
    './flowchart-setting.component.css'
  ]
})
export class FlowchartSettingComponent implements OnInit {

  public node: Node;
  private original: Node;

  constructor(private _setting: SettingService) { 
    _setting.view.subscribe(node => this.init(node));
  }

  ngOnInit() {
    this.node = new Node();
  }

  public init(node: Node) {
    this.node = Object.assign({}, node);
    this.original = Object.assign({}, node);
  }

  public onApply() {
    console.log(this.node);
    //this.flowGraph.updateNode(this.node);
    this._setting.update(this.node);
  }

  public onRevert() {
    this.node = Object.assign({}, this.original);
    console.log(this.node, this.original);
  }
}
