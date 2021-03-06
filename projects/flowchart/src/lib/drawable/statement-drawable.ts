import { Layer } from 'konva/types/Layer';
import { IDrawable } from './i-drawable';
import { Node } from '../object/node';
import { Rect } from 'konva/types/shapes/Rect';
import { Text } from 'konva/types/shapes/Text';
import { ChartUtils } from '../utils/chartutils';
import { Constants } from '../utils/constants';
import { KonvaUtils } from '../utils/konvautils';
import { FontAwesomeUnicode } from '../utils/fontawesome-unicode';
import { GraphService } from '../services/graph.service';
import { ArrowDrawable } from './arrow-drawable';

export class StatementDrawable implements IDrawable {

    public node:Node;

    public box:Rect;
    public title:Text;
    public icon:Text;
    public arrow:ArrowDrawable;

    protected graphService:GraphService;
    private onConfigCallback:any;

    constructor(node:Node, graphService?:GraphService, onConfigCallback?: any) {
        this.node = node;
        this.graphService = graphService;
        this.onConfigCallback = onConfigCallback;
        this.onDrag = this.onDrag.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }

    getNode(): Node {
        return this.node;
    }    
    
    getId(): string {
        return this.node.id;
    }

    draw(layer: Layer): void {
        let style = Object.assign({}, Constants.NODE_BASE, Constants.NODE_STATEMENT, this.node.style);

        style.iconColor = this.node.style.fontColor;
        style.titleFontColor = this.node.style.fontColor;
        style.descriptionFontColor = this.node.style.fontColor;

        this.box = KonvaUtils.createBox(this.node.point, style, Constants.NODE_WIDTH, Constants.NODE_STATEMENT_HEIGHT, this.onDrag, this.onDragStart);
        this.title = KonvaUtils.createTitle(this.node.title, style, this.node.point, Constants.TITLE_OFFSET_X, Constants.TITLE_STATEMENT_OFFSET_Y);        

        layer.add(this.box);
        layer.add(this.title);

        if (this.node.icon !== null) {
            this.icon = KonvaUtils.createIcon(FontAwesomeUnicode[this.node.icon], style, this.node.point, Constants.ICON_OFFSET_X, Constants.ICON_STATEMENT_OFFSET_Y);
            layer.add(this.icon);
        }

        this.arrow = new ArrowDrawable(this, {x: Constants.ICON_STATEMENT_CIRCLERELATION_OFFSET_X, y: Constants.ICON_STATEMENT_CIRCLERELATION_OFFSET_Y}, this.graphService);
        this.arrow.draw(layer);
    }

    update(newnode: Node): void {
        this.node.title = newnode.title;
        this.node.style = newnode.style;

        this.title.text(ChartUtils.format(this.node.title, Constants.MAX_TITLE_LENGTH));
        this.box.fill(this.node.style.boxBackgroundColor);

        this.title.setPosition({
            x: this.node.point.x + Constants.TITLE_OFFSET_X,
            y: this.node.point.y + Constants.TITLE_STATEMENT_OFFSET_Y
        });
    }

    onDrag(e:any) {
        this.node.point.x = e.target.attrs.x;
        this.node.point.y = e.target.attrs.y;

        this.title.setPosition({
            x: this.node.point.x + Constants.TITLE_OFFSET_X,
            y: this.node.point.y + Constants.TITLE_STATEMENT_OFFSET_Y
        });

        if (this.icon !== null) {
            this.icon.setPosition({
                x: this.node.point.x + Constants.ICON_OFFSET_X,
                y: this.node.point.y + Constants.ICON_STATEMENT_OFFSET_Y
            }); 
        }

        if (this.arrow !== null && this.arrow !== undefined) {
            this.arrow.update(this.node);
        }

        this.graphService.positionChanged(this.node);
    }

    onDragStart() {
        if (this.graphService !== null && this.graphService !== undefined) {
            this.graphService.showSetting(this.node);
            this.graphService.nodeSelected(this.node);
        }
    }

    destroy(): void {
        this.box.destroy();
        this.title.destroy();
        this.icon.destroy();
        this.arrow.destroy();
    }

    setSelected(isSelected: boolean) {
        if (isSelected) {
            this.box.strokeWidth(1);
            this.box.strokeEnabled(true);
        } else {
            this.box.strokeWidth(0);
            this.box.strokeEnabled(false);
        }
        
    }

    relation(hasRelation: boolean) {
        if (hasRelation) {
            this.arrow.hide();
        } else {
            this.arrow.show();
        }
    }
}