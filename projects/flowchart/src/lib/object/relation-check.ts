import { Node } from './node';
import { IDrawable } from '../drawable/i-drawable';

export class RelationCheck {

    public x:number;
    public y:number;
    public drawable:IDrawable;
    
    constructor(x:number, y:number, drawable:IDrawable) { 
        this.x = x;
        this.y = y;
        this.drawable = drawable;
    }
}