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

export class StatementDrawable implements IDrawable {

    public node:Node;

    public box:Rect;
    public title:Text;
    public icon:Text;

    protected graphService:GraphService;
    private onConfigCallback:any;

    constructor(node:Node, graphService?:GraphService, onConfigCallback?: any) {
        this.node = node;
        this.graphService = graphService;
        this.onConfigCallback = onConfigCallback;
        this.onClick = this.onClick.bind(this);
    }

    getNode(): Node {
        return this.node;
    }    
    
    getId(): string {
        return this.node.id;
    }

    draw(layer: Layer): void {
        this.box = KonvaUtils.createBoxNoDrag(this.node.point, this.node.style, Constants.NODE_WIDTH, Constants.NODE_STATEMENT_HEIGHT, this.onClick);
        this.title = KonvaUtils.createTitle(this.node.title, this.node.style, this.node.point, Constants.TITLE_OFFSET_X, Constants.TITLE_STATEMENT_OFFSET_Y);        

        layer.add(this.box);
        layer.add(this.title);

        if (this.node.icon !== null) {
            this.icon = KonvaUtils.createIcon(FontAwesomeUnicode[this.node.icon], this.node.style, this.node.point, Constants.ICON_OFFSET_X, Constants.ICON_STATEMENT_OFFSET_Y);
            layer.add(this.icon);
        }
    }

    update(newnode: Node): void {
        this.node.title = newnode.title;

        this.title.text(ChartUtils.format(this.node.title, Constants.MAX_TITLE_LENGTH));

        this.title.setAbsolutePosition({
            x: this.node.point.x + Constants.TITLE_OFFSET_X,
            y: this.node.point.y + Constants.TITLE_STATEMENT_OFFSET_Y
        });
    }

    destroy(): void {
        this.box.destroy();
        this.title.destroy();
        this.icon.destroy();
    }

    onClick() {
        if (this.graphService !== null && this.graphService !== undefined) {
            this.graphService.showSetting(this.node);
            this.graphService.nodeSelected(this.node);
        }
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
        // do nothing
    }
}