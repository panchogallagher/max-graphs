import { Layer } from 'konva/types/Layer';
import { Node } from '../object/node';

export interface IDrawable {
    getNode(): Node;
    getId(): string;
    draw(layer:Layer): void;
    update(node: Node) : void;
    destroy(): void;
    setSelected(isSelected: boolean) : void;
    relation(hasRelation: boolean) : void;
}