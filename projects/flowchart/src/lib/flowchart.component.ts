import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Node } from './object/node';
import { Style } from './object/style';
import { NodeDrawable } from './drawable/node-drawable';
import { Position } from './object/position';

@Component({
  selector: 'lib-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: [
    'bootstrap.min.css',
    './flowchart.component.css'
  ]
})
export class FlowchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
}
