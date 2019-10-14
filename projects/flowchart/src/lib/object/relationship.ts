import { Position } from './position';

export class Relationship {

    public id:string;
    public fromId:string;
    public toId:string;
    public points?:Position[];

}