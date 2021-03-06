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

        let toFormat = text !== undefined && text !== null ? text.trim() : "";
        if (toFormat.length > max && toFormat.length > 0) {
            let totalPoints = toFormat.length - max > 3 ? 3 : toFormat.length - max;
            toFormat = toFormat.substr(0, max - totalPoints);
            for(let i = 0; i < totalPoints; i++) {
                toFormat += ".";
            }
            return toFormat;
        } else {
            return toFormat;
        }
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
     * Clone any nested object
     * @param object 
     */
    public static cloneObject<T>(object: T) : T {
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

    /**
     * Get the OS
     */
    public static getOs() : string {
        var OSName="Windows";
        if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
        if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
        if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
        return OSName;
    }

    /**
     * Get additional offset based on the OS
     */
    public static getAdditionalOffsetX() : number {
        return ChartUtils.getOs() != "Windows" ? 40 : 0;
    }
}