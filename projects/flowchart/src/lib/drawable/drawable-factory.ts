import { IDrawable } from './i-drawable';
import { Node } from '../object/node';
import { NodeDrawable } from './node-drawable';
import { ConditionDrawable } from './condition-drawable';

export class DrawableFactory {

    public static create(node: Node, onClickCallback?: any, onConfigCallback?: any) : IDrawable {
        
        let drawable:IDrawable;

        switch(node.type) {
            case "C":
                drawable = new ConditionDrawable(node, onClickCallback);
                break;
            default:
                drawable = new NodeDrawable(node, onClickCallback, onConfigCallback);
                break;
        }
        return drawable;
    }
}