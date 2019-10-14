import { Component, OnInit, AfterViewInit, EventEmitter, Input } from '@angular/core';
import Konva from 'konva';
import { Node } from '../object/node';
import { KonvaUtils } from '../utils/konvautils';
import { Constants } from '../utils/constants';
import { IDrawable } from '../drawable/i-drawable';
import { DrawableFactory } from '../drawable/drawable-factory';
import { ChartUtils } from '../utils/chartutils';
import { GraphService } from '../services/graph.service';
import { Statement } from '../object/statement';

declare var $: any;

@Component({
  selector: 'flowchart-graph',
  templateUrl: './flowchart-graph.component.html',
  styleUrls: ['./flowchart-graph.component.css']
})
export class FlowchartGraphComponent implements OnInit, AfterViewInit {
  
  onClickConfig: EventEmitter<Node> = null;

  private layer : Konva.Layer;
  private offset: any;
  private drawables: IDrawable[] = [];
  private counter: number = 0;

  constructor(private _graphService: GraphService) { 
    _graphService.onApplySetting.subscribe(this.updateNode.bind(this));
    _graphService.onNewStatement.subscribe(this.addStatement.bind(this));
    _graphService.onNodeSelected.subscribe(this.updateSelected.bind(this));
    this.clickConfig = this.clickConfig.bind(this);
  }

  /** ANGULAR EVENTS */
  ngOnInit() {
    var stage = new Konva.Stage({
      container: 'graph-container',
      width: 700,
      height: 500
    });

    this.layer = new Konva.Layer();
    this.layer.add(KonvaUtils.createBG(700,500));
    
    /*
    let nodes = KonvaUtils.getNodes(2);
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

  /** PUBLIC METHODS */

  /**
   * Export all the current nodes to a object
   */
  public export() : any {
    let nodes = [];
    for (let i = 0; i < this.drawables.length; i++) {
      nodes.push(ChartUtils.clone(this.drawables[i].getNode()));
    }
    return nodes;
  }

  /**
   * Import the nodes to the canvas
   * @param nodes 
   */
  public load(nodes: Node[]) {
    this.clear();

    nodes.forEach(function (node: Node) {
      let drawable = DrawableFactory.create(ChartUtils.clone(node), this._graphService, this.clickConfig);
      this.addDrawable(drawable);
    }.bind(this));
    this.layer.draw();
  }


  /** PRIVATE METHODS */

  /**
   * Generate a new node Id
   */
  private newNodeId() {
    this.counter++;
    return "N" + (this.counter);
  }

  /**
   * Adds a new drawable to the graph
   * @param drawable 
   */
  private addDrawable(drawable: IDrawable) {
    drawable.draw(this.layer);
    this.drawables.push(drawable);
  }

  /**
   * Trigger the click config event
   * @param node 
   */
  private clickConfig(node: Node) {
    if (this.onClickConfig !== null) {
      this.onClickConfig.emit(node);
    }
  }

  /**
   * Clear the layer destroying all the nodes
   */
  private clear() {
    for (let i = 0; i < this.drawables.length; i++) {
      this.drawables[i].destroy();
    }

    this.drawables.slice(0, this.drawables.length);
    this.layer.clear();
  }

  /**
   * Manages the drop event into the canvas creating new nodes
   */
  private onDrop(event, ui) {
    
    let x = ui.position.left - this.offset.left + Constants.NODE_WIDTH/2;
    let y = ui.position.top;

    let node = KonvaUtils.createEmptyNode(ui.draggable.data('type'), this.newNodeId(), x, y);
    this.addDrawable(DrawableFactory.create(node, this._graphService, this.clickConfig));

    this.updateSelected(node.id);
    this._graphService.showSetting(node);
  }

  /**
   * Update the data of a node
   * @param node 
   */
  private updateNode(node: Node) {
    for (let i = 0; i < this.drawables.length; i++) {
      let drawable = this.drawables[i];
      if (drawable.getId() == node.id) {
        drawable.update(node);
        this.layer.draw();
        break;
      }
    }
  }

  /**
   * Create a new statement for a condition node
   * @param parentNode 
   */
  private addStatement(statement: Statement) {
    let node = KonvaUtils.createEmptyNode('I', this.newNodeId(), statement.parentNode.point.x + Constants.CONDITION_OFFSET_X, statement.parentNode.point.y + Constants.CONDITION_OFFSET_Y + (Constants.CONDITION_NODE_OFFSET_Y * statement.totalChilds));
    this.addDrawable(DrawableFactory.create(node, this._graphService, this.clickConfig));

    this.updateSelected(node.id);
    this._graphService.showSetting(node);
  }

  private updateSelected(nodeId: string) {
    this.drawables.forEach((element:IDrawable) => {
      element.setSelected(nodeId === element.getId());
    });    
    this.layer.draw();
  }
}
