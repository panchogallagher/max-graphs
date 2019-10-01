import { Node } from '../object/node';
import { Layer } from 'konva/types/Layer';
import Konva from 'konva';
import { IDrawable } from './IDrawable';
import { Style } from '../object/style';
import { Point } from '../object/point';


export class NodeDrawable implements IDrawable {

    public node:Node;

    constructor(node:Node) {
        this.node = node;
    }

    draw(layer:Layer) {
        
        layer.add(this.addRect(this.node.style, this.node.point, 120, 60));
        layer.add(this.addText(this.node.title, this.node.style, this.node.point, 10, 10));
        layer.add(this.addText(this.node.description, this.node.style, this.node.point, 10, 40));
    }

    addText(text:string, style:Style, point:Point, xOffset:number, yOffset:number) {
        return new Konva.Text({
            x: point.x + xOffset,
            y: point.y + yOffset,
            text: text
          });
    }

    addRect(style:Style, point:Point, width:number, height:number) {
        return new Konva.Rect({
            x: point.x,
            y: point.y,
            width: width,
            height: height,
            fill: 'red',
            shadowBlur: 10,
            cornerRadius: 10
          });
    }
}