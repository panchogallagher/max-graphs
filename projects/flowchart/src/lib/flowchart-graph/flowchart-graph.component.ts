import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import Konva from 'konva';
import { Node } from '../object/node';
import { KonvaUtils } from '../utils/konvautils';
import { Constants } from '../utils/constants';
import { IDrawable } from '../drawable/i-drawable';
import { DrawableFactory } from '../drawable/drawable-factory';
import { ChartUtils } from '../utils/chartutils';
import { GraphService } from '../services/graph.service';
import { Statement } from '../object/statement';
import { RelationCheck } from '../object/relation-check';
import { RelationshipDrawable } from '../drawable/relationship-drawable';
import { Graph } from '../object/graph';
import { Relationship } from '../object/relationship';

declare var $: any;

@Component({
  selector: 'flowchart-graph',
  templateUrl: './flowchart-graph.component.html',
  styleUrls: ['./flowchart-graph.component.css']
})
export class FlowchartGraphComponent implements OnInit, AfterViewInit {
  

  onClickConfig: EventEmitter<Node> = null;

  /** PRIVATE PROPERTIES */
  private layer : Konva.Layer;
  private layerRelationship : Konva.Layer;
  private layerBG : Konva.Layer;
  private offset: any;
  private counter: number = 0;
  private selectedNodeId: string = null;

  private relationship: any = {};
  private drawables: any = {};

  constructor(private _graphService: GraphService) { 
    _graphService.onApplySetting.subscribe(this.updateNode.bind(this));
    _graphService.onNewStatement.subscribe(this.addStatement.bind(this));
    _graphService.onNodeSelected.subscribe(this.updateSelected.bind(this));
    _graphService.onPositionChanged.subscribe(this.updatePosition.bind(this));
    _graphService.onRedraw.subscribe(this.redraw.bind(this));
    _graphService.onCheckRelation.subscribe(this.checkRelationship.bind(this));
    this.clickConfig = this.clickConfig.bind(this);
  }

  /** ANGULAR EVENTS */
  ngOnInit() {
    var stage = new Konva.Stage({
      container: 'graph-container',
      width: 700,
      height: 500
    });


    this.layerRelationship = new Konva.Layer();
    this.layer = new Konva.Layer();
    this.layerBG = new Konva.Layer();

    this.layerBG.add(KonvaUtils.createBG(700,500, this.hideSetting.bind(this)));
  /*  
    this.randomScene();
*/
    stage.add(this.layerBG);
    stage.add(this.layerRelationship);
    stage.add(this.layer);
    this.layerRelationship.draw();
    this.layer.draw();

    $("#graph-container" ).droppable({
      drop: this.onDrop.bind(this)
    });
  }

  ngAfterViewInit() {
    this.offset = $("#graph-container").offset();
  }

  private randomScene() {
    let nodes = KonvaUtils.getNodes(2);
    nodes.forEach(function (node) {
      node.id = this.newNodeId();
      let drawable = DrawableFactory.create(node, this._graphService, this.clickConfig);
      this.addDrawable(drawable);
    }.bind(this));

    let relationships = KonvaUtils.getRelationships();

    relationships.forEach(connect => {
      var line = KonvaUtils.createArrow(connect.id);
      line.points(KonvaUtils.getConnectorPoints(nodes[0].type, nodes[0].point, nodes[1].point));
      this.layer.add(line);
    });
  }

  /** PUBLIC METHODS */

  /**
   * Export all the current nodes to a object
   */
  public export() : Graph {
    let nodes = [];
    let relations = [];
    
    let ids = Object.keys(this.drawables);
    for (let i = 0; i < ids.length; i++) {
      nodes.push(ChartUtils.clone(this.drawables[ids[i]].getNode()));
    }

    let relationIds = Object.keys(this.relationship);
    for (let i = 0; i < relationIds.length; i++) {
      relations.push(ChartUtils.clone(this.relationship[relationIds[i]].relationship));
    }

    return new Graph(nodes, relations);
  }

  /**
   * Import the nodes to the canvas
   * @param nodes 
   */
  public load(graph: Graph) {
    this.clear();

    if (graph.nodes !== undefined) {
      graph.nodes.forEach(function (node: Node) {
        let drawable = DrawableFactory.create(ChartUtils.clone(node), this._graphService, this.clickConfig);
        this.addDrawable(drawable);
        drawable.setSelected(false);
      }.bind(this));
    }

    if (graph.relationship !== undefined) {
      graph.relationship.forEach(function (relation: Relationship) {
        let fromDrawable = this.drawables[relation.fromId];

        let fromNode: Node = fromDrawable.getNode();
        let toNode: Node = this.drawables[relation.toId].getNode();

        this.addRelationship(DrawableFactory.createRelationship(ChartUtils.cloneRelation(relation), fromNode, toNode));
        fromDrawable.relation(true);
      }.bind(this));
    }

    this.hideSetting();
    this.redraw();
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
    this.drawables[drawable.getId()] = drawable;
  }

  /**
   * Adds a new relationship drawable to the graph
   * @param drawable 
   */
  private addRelationship(drawable: RelationshipDrawable) {
    drawable.draw(this.layerRelationship);
    this.relationship[drawable.getId()] = drawable;
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
    let ids = Object.keys(this.drawables);
    for (let i = 0; i < ids.length; i++) {
      this.drawables[ids[i]].destroy();
    }

    let relationIds = Object.keys(this.relationship);
    for (let i = 0; i < relationIds.length; i++) {
      this.relationship[relationIds[i]].destroy();
    }

    this.drawables = {};
    this.relationship = {};
    this.selectedNodeId = null;

    this.layer.clear();
    this.layerRelationship.clear();
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
    this.drawables[node.id].update(node);
    this.redraw();
  }

  /**
   * Create a new statement for a condition node
   * @param parentNode 
   */
  private addStatement(statement: Statement) {
    let node = KonvaUtils.createEmptyNode('I', this.newNodeId(), statement.parentNode.point.x + Constants.CONDITION_OFFSET_X, statement.parentNode.point.y + Constants.CONDITION_OFFSET_Y + (Constants.CONDITION_NODE_OFFSET_Y * statement.totalChilds));
    this.addDrawable(DrawableFactory.create(node, this._graphService, this.clickConfig));

    let relation = KonvaUtils.createEmptyRelationship(this.newNodeId(), statement.parentNode, node);
    this.addRelationship(DrawableFactory.createRelationship(relation, statement.parentNode, node));
    
    this.updateSelected(node.id);
    this._graphService.showSetting(node);
    this.redraw();
  }

  /**
   * Set the current selected node
   * @param nodeId 
   */
  private updateSelected(nodeId: string) {

    if (this.selectedNodeId !== null) {
      this.drawables[this.selectedNodeId].setSelected(false);
    }

    if (nodeId !== null) {
      this.drawables[nodeId].setSelected(true);
    }

    this.selectedNodeId = nodeId;
    this.redraw();
  }

  /**
   * Update the node position
   * @param node 
   */
  private updatePosition(node: Node) {
    let ids = Object.keys(this.relationship);
    for (let i = 0; i < ids.length; i++) {
      let drawable = this.relationship[ids[i]];
      if (drawable.relationship.fromId === node.id || drawable.relationship.toId === node.id) {
        drawable.update(node);
      }
    }
    this.redraw();
  }

  /**
   * Redraw the scene
   */
  private redraw() {
    this.layer.batchDraw();
    this.layerRelationship.batchDraw();
  }

  /**
   * Check if the relation intersects 
   * @param check 
   */
  private checkRelationship(check:RelationCheck) {
    let ids = Object.keys(this.drawables);
    for (let i = 0; i < ids.length; i++) {
      let drawable = this.drawables[ids[i]];
      let node = drawable.getNode();
      if (ChartUtils.haveIntersect(check, node) && ChartUtils.isRelationable(node)) {
        this.createRelationship(check.drawable.getNode(), node);
        check.drawable.relation(true);
      }
    }
  }

  /**
   * Create a new relationship between two nodes
   * @param fromNode 
   * @param toNode 
   */
  private createRelationship(fromNode: Node, toNode:Node) {
    let relation = KonvaUtils.createEmptyRelationship(this.newNodeId(), fromNode, toNode);
    this.addRelationship(DrawableFactory.createRelationship(relation, fromNode, toNode));
    this.redraw();
  } 

  private hideSetting() {
    this.updateSelected(null);
    this._graphService.hideSetting();
  }
}