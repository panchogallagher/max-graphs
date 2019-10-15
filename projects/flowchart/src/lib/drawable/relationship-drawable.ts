import { IDrawable } from './i-drawable';
import { GraphService } from '../services/graph.service';
import { Node } from '../object/node';
import { Layer } from 'konva/types/Layer';
import { KonvaUtils } from '../utils/konvautils';
import { Constants } from '../utils/constants';
import { Relationship } from '../object/relationship';
import { Arrow } from 'konva/types/shapes/Arrow';
import { ChartUtils } from '../utils/chartutils';


export class RelationshipDrawable implements IDrawable {

    public relationship:Relationship;

    private line: Arrow;

    private fromNode:Node;
    private toNode:Node;

    private graphService:GraphService;

    constructor(relationship:Relationship, fromNode: Node, toNode: Node, graphService?:GraphService) {
        this.relationship = relationship;
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.graphService = graphService;
    }

    getNode(): Node {
        return null;
    }    
    
    getId(): string {
        return this.relationship.id;
    }

    draw(layer: Layer): void {
        this.line = KonvaUtils.createArrow(this.relationship.id);
        this.line.points(KonvaUtils.getConnectorPoints(this.fromNode.type, this.fromNode.point, this.toNode.point));
        layer.add(this.line);
    }

    update(newnode: Node): void {
        if (newnode.id == this.fromNode.id) {
            this.fromNode = ChartUtils.clone(newnode);
        }

        if (newnode.id == this.toNode.id) {
            this.toNode = ChartUtils.clone(newnode);
        }

        this.line.points(KonvaUtils.getConnectorPoints(this.fromNode.type, this.fromNode.point, this.toNode.point));
    }

    destroy(): void {
        
    }

    onClick() {
        if (this.graphService !== null && this.graphService !== undefined) {
            
        }
    }

    setSelected(isSelected: boolean) {
        
    }
}