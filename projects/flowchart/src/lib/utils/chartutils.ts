import { Constants } from './constants';
import { Node } from '../object/node';

export class ChartUtils {

    public static format(text: string, max?: number) {
        if (max == null) {
            max = Constants.MAX_DESCRIPTION_LENGTH;
        }
        return text.length > max ? text.substr(0, max - 3) + "..." : text;
    }

    public static clone(object: Node) : Node {
        return JSON.parse(JSON.stringify(object));
    }
}