import { GraphService } from '../services/graph.service';
import { Node } from '../object/node';
import { Layer } from 'konva/types/Layer';
import { KonvaUtils } from '../utils/konvautils';
import { Relationship } from '../object/relationship';
import { Arrow } from 'konva/types/shapes/Arrow';
import { ChartUtils } from '../utils/chartutils';
import { Constants } from '../utils/constants';
import { Text } from 'konva/types/shapes/Text';


export class RelationshipDrawable {

    public relationship:Relationship;
    public fromNode:Node;
    public toNode:Node;

    private title:Text;
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

        const textTitle = this.relationship.title !== undefined ? this.relationship.title : "";
        this.title = KonvaUtils.createText(textTitle, Constants.NODE_BASE, KonvaUtils.getRelationTitlePoint(this.relationship.points, textTitle, Constants.NODE_BASE, this.toNode),1,1, KonvaUtils.getRelationTitleLength(this.relationship.points,Constants.NODE_BASE, textTitle, this.toNode));

        this.line = KonvaUtils.createArrow(this.relationship.id, this.onClick);
        this.line.points(this.relationship.points);

        layer.add(this.line);
        layer.add(this.title);
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

        const textTitle = this.relationship.title !== undefined ? this.relationship.title : "";
        this.title.text(ChartUtils.format(this.relationship.title, KonvaUtils.getRelationTitleLength(this.relationship.points,Constants.NODE_BASE,textTitle, this.toNode)));
        this.title.setPosition(KonvaUtils.getRelationTitlePoint(this.relationship.points, this.title.text(), Constants.NODE_BASE, this.toNode));
    }

    setProperties(newrelationship: Relationship) : void {
        this.relationship.title = newrelationship.title;
        const textTitle = this.relationship.title !== undefined ? this.relationship.title : "";
        this.title.text(ChartUtils.format(this.relationship.title, KonvaUtils.getRelationTitleLength(this.relationship.points,Constants.NODE_BASE,textTitle, this.toNode)));
        this.title.setPosition(KonvaUtils.getRelationTitlePoint(this.relationship.points, this.title.text(), Constants.NODE_BASE, this.toNode));
    }

    destroy(): void {
        this.line.destroy();
        this.title.destroy();
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
        }        
    }
}