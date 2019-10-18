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
    private node:Node;
    private graphService:GraphService;

    constructor(node:Node, graphService?:GraphService) {
        this.id = "arrow-" + node.id;
        this.node = node;
        this.graphService = graphService;
        this.onDragMove = this.onDragMove.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getBaseCoordinate = this.getBaseCoordinate.bind(this);
    }

    getNode(): Node {
        return this.node;
    }    

    getId(): string {
        return this.id;
    }
    
    draw(layer: Layer): void {
        this.circle = KonvaUtils.createCircleDragged({}, this.node.point, Constants.ICON_CIRCLERELATION_OFFSET_X, Constants.ICON_CIRCLERELATION_OFFSET_Y, this.onClick, this.onDragMove, this.onDragEnd);
        this.arrow = KonvaUtils.createArrow(this.id);

        layer.add(this.arrow);
        layer.add(this.circle);
    }

    update(node: Node): void {
        this.node = node;

        this.circle.setAbsolutePosition({
            x: this.node.point.x + Constants.ICON_CIRCLERELATION_OFFSET_X,
            y: this.node.point.y + Constants.ICON_CIRCLERELATION_OFFSET_Y
        }); 

        this.arrow.points([]);
    }

    destroy(): void {
        this.arrow.destroy();
    }

    setSelected(isSelected: boolean): void {
        
    }

    private onDragMove(e:any) {
        let newpoints = this.getBaseCoordinate();
        newpoints.push(e.target.attrs.x, e.target.attrs.y);
        this.arrow.points(newpoints);
    }

    private onDragEnd(e) {
        let check = new RelationCheck(e.target.attrs.x, e.target.attrs.y, this.node);
        //console.log(e.target.attrs.x, e.target.attrs.y, check);
        this.circle.setAbsolutePosition({
            x: this.node.point.x + Constants.ICON_CIRCLERELATION_OFFSET_X,
            y: this.node.point.y + Constants.ICON_CIRCLERELATION_OFFSET_Y
        }); 
        this.arrow.points([]);

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
        return [this.node.point.x + Constants.ICON_ARROW_OFFSET_X, this.node.point.y + Constants.ICON_ARROW_OFFSET_Y];
    }

}