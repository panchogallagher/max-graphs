import { Node } from "./node";

export interface Statement {
    parentNode: Node;
    totalChilds: number;
}