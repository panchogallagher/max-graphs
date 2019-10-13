import { Injectable, Output, EventEmitter } from '@angular/core';
import { Node } from '../object/node';
import { ChartUtils } from '../utils/chartutils';

@Injectable()
export class GraphService {

  @Output() onNewRelationship: EventEmitter<Node> = new EventEmitter();
  @Output() onNewStatement: EventEmitter<Node> = new EventEmitter();

  @Output() onViewSetting: EventEmitter<Node> = new EventEmitter();
  @Output() onApplySetting: EventEmitter<Node> = new EventEmitter();

  constructor() { 

  }

  createStatement(parentNode: Node) {
    this.onNewStatement.emit(parentNode);
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
}
