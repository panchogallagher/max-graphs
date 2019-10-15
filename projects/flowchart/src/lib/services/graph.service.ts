import { Injectable, Output, EventEmitter } from '@angular/core';
import { Node } from '../object/node';
import { ChartUtils } from '../utils/chartutils';
import { Statement } from '../object/statement';

@Injectable()
export class GraphService {

  @Output() onNewRelationship: EventEmitter<Node> = new EventEmitter();
  @Output() onNewStatement: EventEmitter<Statement> = new EventEmitter();
  @Output() onNodeSelected: EventEmitter<string> = new EventEmitter();
  @Output() onPositionChanged: EventEmitter<Node> = new EventEmitter();
  @Output() onViewSetting: EventEmitter<Node> = new EventEmitter();
  @Output() onApplySetting: EventEmitter<Node> = new EventEmitter();

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
}
