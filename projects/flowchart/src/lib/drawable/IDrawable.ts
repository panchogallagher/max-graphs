import { Layer } from 'konva/types/Layer';
import { Node } from '../object/node';

export interface IDrawable {
    draw(layer:Layer, node:Node) : void;
}