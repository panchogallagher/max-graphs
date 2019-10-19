import { GraphService } from '../services/graph.service';
import { Node } from '../object/node';
import { Layer } from 'konva/types/Layer';
import { KonvaUtils } from '../utils/konvautils';
import { Relationship } from '../object/relationship';
import { Arrow } from 'konva/types/shapes/Arrow';
import { ChartUtils } from '../utils/chartutils';
import { Constants } from '../utils/constants';


export class RelationshipDrawable {

    public relationship:Relationship;
    public fromNode:Node;
    public toNode:Node;

    private line: Arrow;
    private graphService:GraphService;

    constructor(relationship:Relationship, fromNode: Node, toNode: Node, graphService?:GraphService) {
        this.relationship = relationship;
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.graphService = graphService;
        this.onClick = this.onClick.bind(this);
    }
    
    getId(): string {
        return this.relationship.id;
    }

    draw(layer: Layer): void {
        this.line = KonvaUtils.createArrow(this.relationship.id, this.onClick);
        this.line.points(this.relationship.points);
        layer.add(this.line);
    }

    update(newnode: Node): void {
        if (newnode.id == this.fromNode.id) {
            this.fromNode = ChartUtils.clone(newnode);
        }

        if (newnode.id == this.toNode.id) {
            this.toNode = ChartUtils.clone(newnode);
        }

        this.relationship.points = KonvaUtils.getConnectorPoints(this.fromNode.type, this.fromNode.point, this.toNode.point);
        this.line.points(this.relationship.points);
    }

    destroy(): void {
        this.line.destroy();
    }

    onClick() {
        if (this.graphService !== null && this.graphService !== undefined) {
            this.graphService.relationSelected(this.relationship);
        }
    }

    setSelected(isSelected: boolean) {
        if (isSelected) {
            this.line.fill(Constants.COLOR_SELECTION);
            this.line.stroke(Constants.COLOR_SELECTION);
            this.line.moveToTop();
        } else {
            this.line.fill(Constants.COLOR_ARROW);
            this.line.stroke(Constants.COLOR_ARROW);
            this.line.moveToBottom();
        }        
    }
}