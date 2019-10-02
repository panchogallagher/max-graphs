import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Node } from './object/node';
import { Style } from './object/style';
import { NodeDrawable } from './drawable/nodedrawable';
import { Position } from './object/position';

@Component({
  selector: 'lib-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("loaded", this.getNodes());

    // first we need to create a stage
    var stage = new Konva.Stage({
      container: 'container',   // id of container <div>
      width: 900,
      height: 500
    });

    // then create layer
    var layer = new Konva.Layer();

    this.getNodes().forEach(function (node) {
      let drawable = new NodeDrawable(node);
      drawable.draw(layer);
    });

    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.draw();
  }


  getNodes() {
    let nodes = [];
    for(let i = 0; i < 10; i++) {
      let node = new Node();
      node.id = (i+1).toString();
      node.width = 100;
      node.height = 20;
      node.type = "N";
      node.title = "Title "+(i + 1);
      node.description = "Description "+(i + 1);
      node.icon = "start";
      node.style = new Style();
      node.point = new Position();
      node.point.x = (i+1) * (Math.floor(Math.random() * 6) + 1)  * 5 * 10;
      node.point.y = (i+1) * (Math.floor(Math.random() * 6) + 1)  * 5 * 10;

      nodes.push(node);
    }
    return nodes;
  }
}
