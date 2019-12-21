import { Element } from './element';

export interface Setting {
    width?:number;
    height?:number;
    allowStyle?:boolean;
    elements?:Element[];
}
