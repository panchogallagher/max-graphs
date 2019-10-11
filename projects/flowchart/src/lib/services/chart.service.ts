import { Injectable, Output, EventEmitter } from '@angular/core';
import { Node } from '../object/node';
import { FlowchartModule } from '../flowchart.module';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  @Output() onClickConfig: EventEmitter<Node> = new EventEmitter();

  constructor() { 

  }

  clickConfig(node: Node) {
    this.onClickConfig.emit(node);
  }
}
