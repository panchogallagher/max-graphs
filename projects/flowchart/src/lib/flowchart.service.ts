import { Injectable, Output, EventEmitter } from '@angular/core';
import { Node } from './object/node';

@Injectable({
  providedIn: 'root'
})
export class FlowchartService {

  @Output() onClickConfig: EventEmitter<Node> = new EventEmitter();

  constructor() { 

  }

  clickConfig(node: Node) {
    this.onClickConfig.emit(node);
  }
}
