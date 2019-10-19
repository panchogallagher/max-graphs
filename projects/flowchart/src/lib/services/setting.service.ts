import { EventEmitter, Output, Injectable } from '@angular/core';
import { Node } from '../object/node';

@Injectable()
export class SettingService {

  @Output() onHide = new EventEmitter();
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

  hide() {
    this.onHide.emit();
  }
}
