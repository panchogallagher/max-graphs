import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../object/node';
import { SettingService } from '../services/setting.service';
import { ChartUtils } from '../utils/chartutils';
import { GraphService } from '../services/graph.service';
import { Relationship } from '../object/relationship';
import { RelationSetting } from '../object/relation-setting';

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

  public relationship: RelationSetting;

  private original: Node;

  public visible:boolean = false;
  public mode: string = null;

  constructor(private _service: GraphService) { 
    _service.onViewSetting.subscribe(this.init.bind(this));
    _service.onHideSetting.subscribe(this.hide.bind(this));
    _service.onViewRelationSetting.subscribe(this.initRelation.bind(this));
  }

  ngOnInit() {
    this.node = new Node();
  }

  public init(node: Node) {
    this.show();
    this.node = ChartUtils.clone(node);
    this.original = ChartUtils.clone(node);
    this.mode = 'N';
  }

  public initRelation(relationship: RelationSetting) {
    this.show();
    this.relationship = ChartUtils.cloneObject<RelationSetting>(relationship);
    this.mode = 'R';
  }

  public onApply() {
    this._service.applyNodeSetting(this.node);
  }

  public onRevert() {
    this.node = ChartUtils.clone(this.original);
    this.onApply();
  }

  public onDelete() {
    this._service.deleteNode(this.node.id);
    this.hide();
  }

  public onDeleteRelation() {
    this._service.deleteRelation(this.relationship.relationship.id);
    this.hide(); 
  }

  public hide() {
    this.visibility(false);
  }

  public show() {
    this.visibility(true);
  }

  private visibility(visible: boolean) {
    this.visible = visible;
  }
}
