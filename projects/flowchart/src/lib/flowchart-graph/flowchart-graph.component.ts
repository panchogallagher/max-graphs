import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import Konva from 'konva';
import { Node } from '../object/node';
import { Style } from '../object/style';
import { NodeDrawable } from '../drawable/node-drawable';
import { KonvaUtils } from '../utils/konvautils';
import { Constants } from '../utils/constants';
import { IDrawable } from '../drawable/i-drawable';
import { DrawableFactory } from '../drawable/drawable-factory';
import { SettingService } from '../services/setting.service';

declare var $: any;

@Component({
  selector: 'flowchart-graph',
  templateUrl: './flowchart-graph.component.html',
  styleUrls: ['./flowchart-graph.component.css']
})
export class FlowchartGraphComponent implements OnInit, AfterViewInit {

  private layer : Konva.Layer;
  private offset: any;
  private drawables: IDrawable[] = [];
  private counter: number = 0;

  constructor(private _setting: SettingService) { 
    _setting.apply.subscribe(node => this.updateNode(node));
  }

  ngOnInit() {
    let nodes = KonvaUtils.getNodes(2);

    var stage = new Konva.Stage({
      container: 'graph-container',
      width: 700,
      height: 500
    });

    this.layer = new Konva.Layer();

    this.layer.add(KonvaUtils.createBG(700,500));
    
    /*
    nodes.forEach(function (node) {
      node.id = this.newNodeId();
      let drawable = DrawableFactory.create(node, this.initSetting.bind(this));
      this.addDrawable(drawable);
    }.bind(this));
    */

    stage.add(this.layer);
    this.layer.draw();

    $("#graph-container" ).droppable({
      drop: this.onDrop.bind(this)
    });
  }

  ngAfterViewInit() {
    this.offset = $("#graph-container").offset();
  }

  public updateNode(node: Node) {
    for (let i = 0; i < this.drawables.length; i++) {
      let drawable = this.drawables[i];
      if (drawable.getId() == node.id) {
        drawable.update(node);
        this.layer.draw();
        break;
      }
    }
  }

  private onDrop(event, ui) {
    
    let x = ui.position.left - this.offset.left + Constants.NODE_WIDTH/2;
    let y = ui.position.top;

    let node = KonvaUtils.createEmptyNode(ui.draggable.data('type'), this.newNodeId(), x, y);
    DrawableFactory.create(node, this.initSetting.bind(this));
    this.addDrawable(DrawableFactory.create(node, this.initSetting.bind(this)));

    this.layer.draw();
    this.initSetting(node);
  }

  private newNodeId() {
    this.counter++;
    return "N" + (this.counter);
  }

  private initSetting(node: Node) {
    this._setting.show(node);
    //this.nodeSetting.init(node);
  }

  private addDrawable(drawable: IDrawable) {
    drawable.draw(this.layer);
    this.drawables.push(drawable);
  }
}
