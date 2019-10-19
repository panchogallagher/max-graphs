import { Node } from './node';
import { Relationship } from './relationship';

export class RelationSetting {

    public fromNode:Node;
    public toNode:Node;
    public relationship:Relationship;
    
    constructor(fromNode:Node, toNode:Node, relationship:Relationship) { 
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.relationship = relationship;
    }
}