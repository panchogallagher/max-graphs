import { Relationship } from './relationship';
import { Node } from './node';

export class Graph {
    nodes: Node[] = [];
    relationship: Relationship[] = [];

    constructor(nodes?: Node[], relationship?:Relationship[]) {
        this.nodes = nodes;
        this.relationship = relationship;
    }
}