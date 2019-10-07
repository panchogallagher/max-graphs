import { Layer } from 'konva/types/Layer';
import { Node } from '../object/node';

export interface IDrawable {
    getId(): string;
    draw(layer:Layer): void;
    update(node: Node) : void;
}