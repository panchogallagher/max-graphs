import { IDrawable } from './i-drawable';
import { Arrow } from 'konva/types/shapes/Arrow';
import { Layer } from 'konva/types/Layer';
import { Node } from '../object/node';
import { GraphService } from '../services/graph.service';
import { KonvaUtils } from '../utils/konvautils';
import { Constants } from '../utils/constants';
import { Circle } from 'konva/types/shapes/Circle';
import { Position } from '../object/position';
import { RelationCheck } from '../object/relation-check';

export class ArrowDrawable implements IDrawable {

    public arrow:Arrow;
    public circle:Circle;
    
    private id:string;
    private drawable:IDrawable;
    private graphService:GraphService;
    private offset:any;

    constructor(drawable:IDrawable, offset:any, graphService?:GraphService) {
        this.id = "arrow-" + drawable.getId();
        this.drawable = drawable;
        this.graphService = graphService;
        this.offset = offset;
        this.onDragMove = this.onDragMove.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getBaseCoordinate = this.getBaseCoordinate.bind(this);
    }

    getNode(): Node {
        return this.drawable.getNode();
    }    

    getId(): string {
        return this.id;
    }
    
    draw(layer: Layer): void {
        this.circle = KonvaUtils.createCircleDragged({}, this.getNode().point, this.offset.x, this.offset.y, this.onClick, this.onDragMove, this.onDragEnd);
        this.arrow = KonvaUtils.createArrow(this.id);
        this.arrow.points([]);
        this.arrow.hide();

        layer.add(this.arrow);
        layer.add(this.circle);
    }

    update(node: Node): void {

        this.circle.setAbsolutePosition({
            x: node.point.x + this.offset.x,
            y: node.point.y + this.offset.y
        }); 

        this.arrow.points([]);
        this.arrow.hide();
    }

    destroy(): void {
        this.circle.destroy();
        this.arrow.destroy();
    }

    setSelected(isSelected: boolean): void {
        
    }

    private onDragMove(e:any) {
        let newpoints = this.getBaseCoordinate();
        newpoints.push(e.target.attrs.x, e.target.attrs.y);
        this.arrow.points(newpoints);
        this.arrow.show();
    }

    private onDragEnd(e) {
        let check = new RelationCheck(e.target.attrs.x, e.target.attrs.y, this.drawable);

        let node = this.drawable.getNode();
        this.circle.setAbsolutePosition({
            x: node.point.x + this.offset.x,
            y: node.point.y + this.offset.y
        }); 
        this.arrow.points([]);
        this.arrow.hide();

        this.graphService.checkRelation(check);
        this.graphService.redraw();
    }

    private onClick() {
        /*
        if (this.graphService !== null && this.graphService !== undefined) {
            this.graphService.showSetting(this.node);
            this.graphService.nodeSelected(this.node);
        }
        */
    }

    private getBaseCoordinate() {
        let node = this.drawable.getNode();
        return [node.point.x + Constants.ICON_ARROW_OFFSET_X, node.point.y + this.offset.y];
    }

    hide() {
        this.circle.hide();
        this.arrow.hide();
    }

    show() {
        this.circle.show();
        this.arrow.show();
    }

    relation(hasRelation: boolean) {
        // do nothing
    }
}