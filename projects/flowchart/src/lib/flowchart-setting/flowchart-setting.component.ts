import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../object/node';
import { SettingService } from '../services/setting.service';
import { ChartUtils } from '../utils/chartutils';

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
    this.node = ChartUtils.clone(node);
    this.original = ChartUtils.clone(node);
  }

  public onApply() {
    this._setting.update(this.node);
  }

  public onRevert() {
    this.node = ChartUtils.clone(this.original);
    this.onApply();
  }
}
