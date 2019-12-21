import { Component, OnInit, OnChanges, AfterViewInit, AfterViewChecked} from '@angular/core';
import { Node } from '../object/node';
import { ChartUtils } from '../utils/chartutils';
import { GraphService } from '../services/graph.service';
import { RelationSetting } from '../object/relation-setting';
import 'select2';
import { FontAwesomeUnicode } from '../utils/fontawesome-unicode';
import { HexColor } from '../utils/hex-color';
import { Style } from '../object/style';
import { Relationship } from '../object/relationship';

declare var $: any;

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
  private originalRelationship: RelationSetting;

  public visible:boolean = false;
  public mode: string = null;
  public colors: string[] = HexColor;
  public icons: string[] = Object.keys(FontAwesomeUnicode);

  private select2Setting: any = {
    templateResult: this.format,
    escapeMarkup: function(m) { 
      return m; 
    }
  };

  constructor(private _service: GraphService) { 
    _service.onViewSetting.subscribe(this.init.bind(this));
    _service.onHideSetting.subscribe(this.hide.bind(this));
    _service.onViewRelationSetting.subscribe(this.initRelation.bind(this));
    this.initSelect2 = this.initSelect2.bind(this);
    this.format = this.format.bind(this);
  }

  ngOnInit() {
    this.node = new Node();
    this.node.style = new Style();
    this.relationship = new RelationSetting(this.node, this.node, new Relationship());
    this.initSelect2();
  }

  public initSelect2() {

    setTimeout(function () {
      $(".select2").select2(this.select2Setting);
    }.bind(this), 10);

    $(".select2-container").css("width", "100%");
  }

  private format(icon) {
    return '<i class="fa fa-' + icon.text + '"></i>&nbsp;'+ icon.text;
  }

  public init(node: Node) {
    this.show();
    this.node = ChartUtils.clone(node);
    this.original = ChartUtils.clone(node);
    this.mode = 'N';

    setTimeout(function () {
      $(".select2").select2(this.select2Setting).val(this.node.icon);
    }.bind(this), 10);
  }

  public initRelation(relationship: RelationSetting) {
    this.show();
    this.relationship = ChartUtils.cloneObject<RelationSetting>(relationship);
    this.originalRelationship = ChartUtils.cloneObject<RelationSetting>(relationship);
    this.mode = 'R';
  }

  public onApply() {
    this.node.icon = $("#fi-icon").select2().val();
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

  public onApplyRelation() {
    this._service.applyRelationSetting(this.relationship.relationship);
  }

  public onRevertRelation() {
    this.relationship = ChartUtils.cloneObject<RelationSetting>(this.originalRelationship);
    this.onApplyRelation();
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
