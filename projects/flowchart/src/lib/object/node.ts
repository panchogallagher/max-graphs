import { Position } from './position';
import { Style } from './style';

export class Node {

    public id:string;
    public point:Position;
    public width:number;
    public height:number;
    public type:string;
    public title:string;
    public description:string;
    public icon:string;    
    public style:Style;

}