import { Constants } from './constants';
import { Node } from '../object/node';
import { RelationCheck } from '../object/relation-check';
import { Relationship } from '../object/relationship';

export class ChartUtils {

    /**
     * Format text to a max length
     * @param text 
     * @param max 
     */
    public static format(text: string, max?: number) {
        if (max == null) {
            max = Constants.MAX_DESCRIPTION_LENGTH;
        }
        return text.length > max ? text.substr(0, max - 3) + "..." : text;
    }

    /**
     * Clone a nested object node
     * @param object 
     */
    public static clone(object: Node) : Node {
        return JSON.parse(JSON.stringify(object));
    }

    /**
     * Clone a nested object relationship
     * @param object 
     */
    public static cloneRelation(object: Relationship) : Relationship {
        return JSON.parse(JSON.stringify(object));
    }

    /**
     * Check if the relation intersects with the node
     * @param check 
     * @param node 
     */
    public static haveIntersect(check: RelationCheck, node:Node) : boolean {
        let position = node.point;
        return check.x >= position.x && check.x <= position.x + Constants.NODE_WIDTH && check.y >= position.y && check.y <= position.y + Constants.NODE_HEIGHT;
    }

    /**
     * Check if the node is relationable
     * @param node 
     */
    public static isRelationable(node:Node) : boolean {
        return Constants.NO_RELATION_TYPE.indexOf(node.type) === -1;
    }
}