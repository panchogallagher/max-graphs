import { Component, OnInit, Input } from '@angular/core';
import Konva from 'konva';
import { Node } from '../object/node';
import { Style } from '../object/style';
import { NodeDrawable } from '../drawable/node-drawable';
import { Position } from '../object/position';
import { KonvaUtils } from '../utils/konvautils';
import { Constants } from '../utils/constants';
import { FlowchartSettingComponent } from '../flowchart-setting/flowchart-setting.component';

declare var $: any;

@Component({
  selector: 'flowchart-graph',
  templateUrl: './flowchart-graph.component.html',
  styleUrls: ['./flowchart-graph.component.css']
})
export class FlowchartGraphComponent implements OnInit {

  private layer : Konva.Layer;
  private offset: any;
  private drawables: NodeDrawable[] = [];

  @Input() nodeSetting: FlowchartSettingComponent;

  constructor() { }

  ngOnInit() {
    this.offset = $("#graph-container").offset();
    let nodes = KonvaUtils.getNodes(2);

    var stage = new Konva.Stage({
      container: 'graph-container',
      width: 700,
      height: 500
    });

    this.layer = new Konva.Layer();

    this.layer.add(KonvaUtils.createBG(700,500));
    
    nodes.forEach(function (node) {
      node.id = this.newNodeId();
      let drawable = new NodeDrawable(node, this.initSetting.bind(this));
      this.addDrawable(drawable);
    }.bind(this));

    stage.add(this.layer);
    this.layer.draw();

    $("#graph-container" ).droppable({
      drop: this.onDrop.bind(this)
    });
  }

  public updateNode(node: Node) {
    for (let i = 0; i < this.drawables.length; i++) {
      let drawable = this.drawables[i];
      if (drawable.node.id == node.id) {
        drawable.update(node);
        this.layer.draw();
        break;
      }
    }
  }

  private onDrop(event, ui) {
    
    let x = ui.position.left - this.offset.left + Constants.NODE_WIDTH/2;
    let y = ui.position.top - this.offset.top;

    let node = KonvaUtils.createEmptyNode(ui.draggable.data('type'), this.newNodeId(), x, y);
    this.addDrawable(new NodeDrawable(node, this.initSetting.bind(this)));

    this.layer.draw();
    this.initSetting(node);
  }

  private newNodeId() {
    return "N" + (this.drawables.length + 1);
  }

  private initSetting(node: Node) {
    this.nodeSetting.init(node);
  }

  private addDrawable(drawable: NodeDrawable) {
    drawable.draw(this.layer);
    this.drawables.push(drawable);
  }
}
