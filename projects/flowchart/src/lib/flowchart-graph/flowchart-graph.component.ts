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
import { RelationCheck } from '../object/relation-check';
import { RelationshipDrawable } from '../drawable/relationship-drawable';
import { Graph } from '../object/graph';
import { Relationship } from '../object/relationship';
import { RelationSetting } from '../object/relation-setting';
import { Setting } from '../object/setting';

declare var $: any;

@Component({
  selector: 'flowchart-graph',
  templateUrl: './flowchart-graph.component.html',
  styleUrls: ['./flowchart-graph.component.css']
})
export class FlowchartGraphComponent implements OnInit, AfterViewInit {
  
  @Input() settings: Setting = null;
  
  onClickConfig: EventEmitter<Node> = null;

  /** PRIVATE PROPERTIES */
  private stage : Konva.Stage;
  private layer : Konva.Layer;
  private layerRelationship : Konva.Layer;
  private offset: any;
  private counter: number = 0;
  private selectedNodeId: string = null;
  private scrollContainer: any = null;
  private largeContainer: any = null;

  private relationship: any = {};
  private drawables: any = {};

  constructor(private _graphService: GraphService) { 
    _graphService.onApplySetting.subscribe(this.updateNode.bind(this));
    _graphService.onNewStatement.subscribe(this.addStatement.bind(this));
    _graphService.onNodeSelected.subscribe(this.updateSelected.bind(this));
    _graphService.onPositionChanged.subscribe(this.updatePosition.bind(this));
    _graphService.onRedraw.subscribe(this.redraw.bind(this));
    _graphService.onCheckRelation.subscribe(this.checkRelationship.bind(this));
    _graphService.onCollisionCheck.subscribe(this.checkCollision.bind(this));
    _graphService.onDeleteNode.subscribe(this.deleteNode.bind(this));
    _graphService.onRelationSelected.subscribe(this.selectedRelationship.bind(this));
    _graphService.onDeleteRelation.subscribe(this.deleteRelationship.bind(this));
    _graphService.onZoomIn.subscribe(this.zoomIn.bind(this));
    _graphService.onZoomOut.subscribe(this.zoomOut.bind(this));
    this.clickConfig = this.clickConfig.bind(this);
    this.scrollStage = this.scrollStage.bind(this);
    this.initOffset = this.initOffset.bind(this);
  }

  /** ANGULAR EVENTS */
  ngOnInit() {
    let width = this.settings.width;
    let height = this.settings.height;

    this.stage = new Konva.Stage({
      container: 'graph-container',
      width: width,
      height: height,
      scale: {
        x: Constants.ZOOM_INITIAL,
        y: Constants.ZOOM_INITIAL
      }
    });

    this.layerRelationship = new Konva.Layer();
    this.layer = new Konva.Layer();

    KonvaUtils.createImageBG(width,height, this.layerRelationship, this.hideSetting.bind(this));

    this.stage.add(this.layerRelationship);
    this.stage.add(this.layer);
    
    this.layerRelationship.draw();
    this.layer.draw();

    $("#graph-container" ).droppable({
      drop: this.onDrop.bind(this)
    });

    this.largeContainer = document.getElementById('large-container');
    this.changeSize(width, height);

    this.scrollContainer = document.getElementById('scroll-container');
    this.scrollContainer.addEventListener('scroll', this.scrollStage);
  }

  ngAfterViewInit() {
    this.initOffset();
    $( window ).resize(() => {
      this.initOffset();
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

        this.addRelationship(DrawableFactory.createRelationship(ChartUtils.cloneRelation(relation), fromNode, toNode, this._graphService));
        fromDrawable.relation(true);
      }.bind(this));
    }

    this.initMaxNodeId();
    this.hideSetting();
    this.redraw();
  }


  /** PRIVATE METHODS */

  private initOffset() {
    let bounding = document.getElementsByTagName("lib-flowchart")[0].getBoundingClientRect()
    this.offset = {
      bottom: bounding.bottom,
      height: bounding.height,
      left: bounding.left + 194,
      right: bounding.right,
      top: bounding.top,
      width: bounding.width,
      // @ts-ignore
      x: bounding.x,
      // @ts-ignore
      y: bounding.y
    };
  }

  /**
   * Generate a new node Id
   */
  private newNodeId() {
    this.counter++;
    return Constants.NODE_ID_PREFIX + (this.counter);
  }

  /**
   * Init the max node Id
   */
  private initMaxNodeId() {
    let maxNodeId:number = 0;
    let ids = Object.keys(this.drawables);
    for (let i = 0; i < ids.length; i++) {
      let nodeId = parseInt(this.drawables[ids[i]].getNode().id.replace(Constants.NODE_ID_PREFIX, ''));
      if (maxNodeId < nodeId) {
        maxNodeId = nodeId;
      }
    }

    let relationIds = Object.keys(this.relationship);
    for (let i = 0; i < relationIds.length; i++) {
      let nodeId = parseInt(this.relationship[relationIds[i]].relationship.id.replace(Constants.NODE_ID_PREFIX, ''));
      if (maxNodeId < nodeId) {
        maxNodeId = nodeId;
      }
    }

    this.counter = maxNodeId;
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
    let scale = this.stage.getAbsoluteScale().x;
    var dx = this.scrollContainer.scrollLeft - $(window).scrollLeft();
    var dy = this.scrollContainer.scrollTop;

    let x = (dx + ui.offset.left - this.offset.left - Constants.NODE_WIDTH/2 + 75 - ChartUtils.getAdditionalOffsetX()) / scale;
    let y = (dy + ui.position.top) / scale;

    //let node = KonvaUtils.createEmptyNode(ui.draggable.data('type'), this.newNodeId(), x, y);
    let node = KonvaUtils.createEmptyNodeElement(this.settings.elements[ui.draggable.data('id')], this.newNodeId(), x, y);
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
    this.addRelationship(DrawableFactory.createRelationship(relation, statement.parentNode, node, this._graphService));
    
    this.updateSelected(node.id);
    this._graphService.showSetting(node);
    this.redraw();
  }

  /**
   * Set the current selected node
   * @param nodeId 
   */
  private updateSelected(elementId: string) {

    if (this.selectedNodeId !== null) {

      if (this.drawables[this.selectedNodeId] !== undefined) {
        this.drawables[this.selectedNodeId].setSelected(false);
      }

      if (this.relationship[this.selectedNodeId] !== undefined) {
        this.relationship[this.selectedNodeId].setSelected(false);
      }
    }

    if (elementId !== null) {
      if (this.drawables[elementId] !== undefined) {
        this.drawables[elementId].setSelected(true);
      }

      if (this.relationship[elementId] !== undefined) {
        this.relationship[elementId].setSelected(true);
      }
    }

    this.selectedNodeId = elementId;
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
    let relationCreated = false;
    for (let i = 0; i < ids.length; i++) {
      let drawable = this.drawables[ids[i]];
      let node = drawable.getNode();
      if (!relationCreated && ChartUtils.haveIntersect(check, node) && ChartUtils.isRelationable(node)) {
        drawable.setSelected(false);
        this.createRelationship(check.drawable.getNode(), node);
        check.drawable.relation(true);
        relationCreated = true;
      } else {
        drawable.setSelected(false);
      }
    }
    this.redraw();
  }

  /**
   * Check node relation collision
   * @param check 
   */
  private checkCollision(check:RelationCheck) {
    let checkId = check.drawable.getNode().id;
    let collisionDetected = false;
    let ids = Object.keys(this.drawables);
    for (let i = 0; i < ids.length; i++) {
      let drawable = this.drawables[ids[i]];
      let node = drawable.getNode();
      if (!collisionDetected && ChartUtils.haveIntersect(check, node) && ChartUtils.isRelationable(node)) {
        drawable.setSelected(true);
        collisionDetected = true;
      } else if (checkId !== node.id) {
        drawable.setSelected(false);
      }
    }
    this.redraw();
  }

  /**
   * Create a new relationship between two nodes
   * @param fromNode 
   * @param toNode 
   */
  private createRelationship(fromNode: Node, toNode:Node) {
    let relation = KonvaUtils.createEmptyRelationship(this.newNodeId(), fromNode, toNode);
    this.addRelationship(DrawableFactory.createRelationship(relation, fromNode, toNode, this._graphService));
    this.updateSelected(relation.id);
    this._graphService.showRelationSetting(new RelationSetting(fromNode, toNode, relation));
    this.redraw();
  } 

  /**
   * Hide configuration settings
   */
  private hideSetting() {
    this.updateSelected(null);
    this._graphService.hideSetting();
  }

  /**
   * Drop a node by the id
   * @param nodeId 
   */
  private dropNode(nodeId: string) {
    if (this.drawables[nodeId] !== undefined) {
      let drawable = this.drawables[nodeId];
      drawable.destroy();
      delete this.drawables[nodeId];
      this.selectedNodeId = null;
    }
  }
  
  /**
   * Delete a node
   * @param nodeId 
   */
  private deleteNode(nodeId: string) {
    let ids = Object.keys(this.relationship);
    for (let i = 0; i < ids.length; i++) {
      let drawable = this.relationship[ids[i]];
      if (drawable !== undefined) {
        let fromId = drawable.relationship.fromId;
        let toId = drawable.relationship.toId;
        let removeTo = false;
        if (fromId === nodeId || toId === nodeId) {

          if (this.drawables[fromId] !== undefined) {
            let fromDrawable = this.drawables[fromId];
            let fromNode = fromDrawable.getNode();
            
            if (fromNode.type === 'C') {
              fromDrawable.removeChild();
              removeTo = true;
            }
    
            fromDrawable.relation(false);
          }

          drawable.destroy();
          delete this.relationship[ids[i]];

          if (removeTo) {
            this.dropNode(toId);
            this.dropRelationship(toId);
          }
        }
      }
    }

    this.dropNode(nodeId);
    this.updateSelected(null);
    this.redraw();
  }

  /**
   * Drop the relations from a node
   * @param nodeId 
   */
  private dropRelationship(nodeId: string) {
    let ids = Object.keys(this.relationship);
    for (let i = 0; i < ids.length; i++) {
      let drawable = this.relationship[ids[i]];
      if (drawable !== undefined) {
        let fromId = drawable.relationship.fromId;
        if (fromId === nodeId) {
          drawable.destroy();
          delete this.relationship[ids[i]];
        }
      }
    }
  }

  /**
   * Delete all the relations from/to a node
   * @param relationId 
   */
  private deleteRelationship(relationId: string) {
      let drawable = this.relationship[relationId];
      let fromId = drawable.relationship.fromId;
      let removeTo = false;
      let toId = drawable.relationship.toId;

      if (this.drawables[fromId] !== undefined) {
        let fromDrawable = this.drawables[fromId];
        let fromNode = fromDrawable.getNode();
        
        if (fromNode.type === 'C') {
          fromDrawable.removeChild();
          removeTo = true;
        }

        fromDrawable.relation(false);
      }

      if (this.drawables[toId] !== undefined && removeTo) {
        this.deleteNode(toId);
      }

      drawable.destroy();
      delete this.relationship[relationId];

      this.updateSelected(null);
      this.redraw();
  }

  /**
   * Set a selected relationship
   * @param relationship 
   */
  private selectedRelationship(relationship: Relationship) {
    let fromNode = this.drawables[relationship.fromId].getNode();
    let toNode = this.drawables[relationship.toId].getNode();
    this.updateSelected(relationship.id);
    this._graphService.showRelationSetting(new RelationSetting(fromNode, toNode, relationship));
  }

  /**
   * Zoom in the canvas
   */
  private zoomIn() {
    let scale = this.stage.getAbsoluteScale().x + Constants.ZOOM_CHANGE;

    if (scale <= Constants.ZOOM_MAX) {
      this.resize(scale);

      this.stage.scale({
        x: scale,
        y: scale
      });
      this.stage.batchDraw();
    }
  }

  /**
   * Zoom out the canvas
   */
  private zoomOut() {
    let scale = this.stage.getAbsoluteScale().x - Constants.ZOOM_CHANGE;

    if (scale >= Constants.ZOOM_MIN) {

      this.resize(scale);

      this.stage.scale({
        x: scale,
        y: scale
      });
      this.stage.batchDraw();
    }
  }

  /**
   * Resize the container 
   * @param scale 
   */
  private resize(scale?: number) {
    let newWidth = Math.round(this.settings.width * scale);
    let newHeight = Math.round(this.settings.height * scale);
    this.changeSize(newWidth, newHeight);
  }

  /**
   * Scroll the stage
   */
  private scrollStage() {
    var dx = this.scrollContainer.scrollLeft;
    var dy = this.scrollContainer.scrollTop;
    this.stage.container().style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
    this.stage.x(-dx);
    this.stage.y(-dy);

    this.stage.batchDraw();
  }

  /**
   * Change the large container size
   */
  private changeSize(width:number, height:number) {
    this.largeContainer.style.width = width + 'px';     
    this.largeContainer.style.height = height + 'px';
  }

}