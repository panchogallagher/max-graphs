import { Node } from './node';

export class RelationCheck {

    public x:number;
    public y:number;
    public node:Node;
    
    constructor(x:number, y:number, node:Node) { 
        this.x = x;
        this.y = y;
        this.node = node;
    }
}