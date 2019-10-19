import { Injectable, Output, EventEmitter } from '@angular/core';
import { Node } from '../object/node';
import { ChartUtils } from '../utils/chartutils';
import { Statement } from '../object/statement';
import { RelationCheck } from '../object/relation-check';
import { Relationship } from '../object/relationship';
import { RelationSetting } from '../object/relation-setting';

@Injectable()
export class GraphService {

  @Output() onNewRelationship: EventEmitter<Node> = new EventEmitter();
  @Output() onNewStatement: EventEmitter<Statement> = new EventEmitter();
  @Output() onNodeSelected: EventEmitter<string> = new EventEmitter();
  @Output() onDeleteNode: EventEmitter<string> = new EventEmitter();
  @Output() onDeleteRelation: EventEmitter<string> = new EventEmitter();
  @Output() onPositionChanged: EventEmitter<Node> = new EventEmitter();
  @Output() onViewSetting: EventEmitter<Node> = new EventEmitter();
  @Output() onViewRelationSetting: EventEmitter<RelationSetting> = new EventEmitter();
  @Output() onRelationSelected: EventEmitter<Relationship> = new EventEmitter();
  @Output() onApplySetting: EventEmitter<Node> = new EventEmitter();
  @Output() onRedraw = new EventEmitter();
  @Output() onCheckRelation: EventEmitter<RelationCheck> = new EventEmitter();
  @Output() onCollisionCheck: EventEmitter<RelationCheck> = new EventEmitter();
  @Output() onHideSetting = new EventEmitter();

  constructor() { 

  }

  createStatement(statement: Statement) {
    this.onNewStatement.emit(statement);
  }

  createRelationship(parentNode: Node) {
    this.onNewRelationship.emit(parentNode);
  }

  showSetting(node: Node) {
    this.onViewSetting.emit(ChartUtils.clone(node));
  }

  applyNodeSetting(node: Node) {
    this.onApplySetting.emit(node);
  }

  nodeSelected(node: Node) {
    this.onNodeSelected.emit(node.id);
  }

  positionChanged(node: Node) {
    this.onPositionChanged.emit(node);
  }

  redraw() {
    this.onRedraw.emit();
  }

  checkRelation(check:RelationCheck) {
    this.onCheckRelation.emit(check);
  }

  hideSetting() {
    this.onHideSetting.emit();
  }

  deleteNode(nodeId: string) {
    this.onDeleteNode.emit(nodeId);
  }

  deleteRelation(relationId: string) {
    this.onDeleteRelation.emit(relationId);
  }

  showRelationSetting(relationship: RelationSetting) {
    this.onViewRelationSetting.emit(relationship);
  }

  relationSelected(relationship: Relationship) {
    this.onRelationSelected.emit(relationship);
  }

  checkCollision(check:RelationCheck) {
    this.onCollisionCheck.emit(check);
  }
}
