import { IDrawable } from './i-drawable';
import { Node } from '../object/node';
import { NodeDrawable } from './node-drawable';
import { ConditionDrawable } from './condition-drawable';
import { StatementDrawable } from './statement-drawable';
import { GraphService } from '../services/graph.service';
import { Relationship } from '../object/relationship';
import { RelationshipDrawable } from './relationship-drawable';

export class DrawableFactory {

    public static create(node: Node, graphService?: GraphService, onConfigCallback?: any) : IDrawable {
        
        let drawable:IDrawable;

        switch(node.type) {
            case "C":
                drawable = new ConditionDrawable(node, graphService, onConfigCallback);
                break;
            case "I":
                drawable = new StatementDrawable(node, graphService);
                break;
            default:
                drawable = new NodeDrawable(node, graphService, onConfigCallback);
                break;
        }
        return drawable;
    }

    public static createRelationship(relationship: Relationship,fromNode: Node, toNode: Node, graphService?: GraphService) : RelationshipDrawable {
        return new RelationshipDrawable(relationship, fromNode, toNode, graphService);
    }
}