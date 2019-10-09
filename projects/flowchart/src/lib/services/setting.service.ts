import { EventEmitter, Output } from '@angular/core';
import { Node } from '../object/node';

export class SettingService {

  @Output() view: EventEmitter<Node> = new EventEmitter();
  @Output() apply: EventEmitter<Node> = new EventEmitter();

  constructor() { 

  }

  show(node: Node) {
    this.view.emit(node);
  }

  update(node: Node) {
    this.apply.emit(node);
  }
}
