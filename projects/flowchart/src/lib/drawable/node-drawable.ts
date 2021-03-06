import { Layer } from 'konva/types/Layer';
import { Rect } from 'konva/types/shapes/Rect';
import { Text } from 'konva/types/shapes/Text';
import { Node } from '../object/node';
import { KonvaUtils } from '../utils/konvautils';
import { Constants } from '../utils/constants';
import { ChartUtils } from '../utils/chartutils';
import { FontAwesomeUnicode } from '../utils/fontawesome-unicode';
import { IDrawable } from './i-drawable';
import { GraphService } from '../services/graph.service';
import { ArrowDrawable } from './arrow-drawable';
import { Style } from '../object/style';

export class NodeDrawable implements IDrawable {

    public node:Node;

    public box:Rect;
    public title:Text;
    public description:Text;
    public config:Text;
    public icon:Text;
    public arrow:ArrowDrawable = null;

    protected graphService:GraphService;
    private onConfigCallback:any;
    private layer:Layer = null;

    constructor(node:Node, graphService?:GraphService, onConfigCallback?: any) {
        this.node = node;
        this.graphService = graphService;
        this.onConfigCallback = onConfigCallback;
        this.onDrag = this.onDrag.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }

    draw(layer:Layer) {
        let style = this.getStyle(this.node.type, this.node.style, true);
        
        this.box = KonvaUtils.createBox(this.node.point, style, Constants.NODE_WIDTH, Constants.NODE_HEIGHT, this.onDrag, this.onDragStart);
        this.title = KonvaUtils.createTitle(this.node.title, style, this.node.point, Constants.TITLE_OFFSET_X, this.node.description != '' ? Constants.TITLE_OFFSET_Y : Constants.TITLE_OFFSET_NODESCRIPTION_Y);
        this.description = KonvaUtils.createDescription(this.node.description, style, this.node.point, Constants.DESCRIPTION_OFFSET_X, Constants.DESCRIPTION_OFFSET_Y);
        this.config = KonvaUtils.createIcon(FontAwesomeUnicode.cog, style, this.node.point, Constants.ICON_CONFIG_OFFSET_X, Constants.ICON_CONFIG_OFFSET_Y, this.onClickConfig.bind(this));

        layer.add(this.box);
        layer.add(this.title);
        layer.add(this.description);
        layer.add(this.config);

        if (this.node.icon !== null) {
            this.icon = KonvaUtils.createIcon(FontAwesomeUnicode[this.node.icon], style, this.node.point, Constants.ICON_OFFSET_X, Constants.ICON_OFFSET_Y);
            layer.add(this.icon);
        }

        if (this.node.type !== 'E' && this.node.type !== 'C') {
            this.arrow = new ArrowDrawable(this, {x: Constants.ICON_CIRCLERELATION_OFFSET_X, y: Constants.ICON_CIRCLERELATION_OFFSET_Y}, this.graphService);
            this.arrow.draw(layer);
        }

        this.layer = layer;
    }

    onDrag(e:any) {
        this.node.point.x = e.target.attrs.x;
        this.node.point.y = e.target.attrs.y;

        this.title.setPosition({
            x: this.node.point.x + Constants.TITLE_OFFSET_X,
            y: this.node.point.y + (this.node.description != '' ? Constants.TITLE_OFFSET_Y : Constants.TITLE_OFFSET_NODESCRIPTION_Y)
        });

        this.description.setPosition({
            x: this.node.point.x + Constants.DESCRIPTION_OFFSET_X,
            y: this.node.point.y + Constants.DESCRIPTION_OFFSET_Y
        });

        this.config.setPosition({
            x: this.node.point.x + Constants.ICON_CONFIG_OFFSET_X,
            y: this.node.point.y + Constants.ICON_CONFIG_OFFSET_Y
        });

        if (this.icon !== null) {
            this.icon.setPosition({
                x: this.node.point.x + Constants.ICON_OFFSET_X,
                y: this.node.point.y + Constants.ICON_OFFSET_Y
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

    update(newnode: Node) {
        let style = this.getStyle(this.node.type, this.node.style, true);

        this.node.title = newnode.title;
        this.node.icon = newnode.icon;
        this.node.description = newnode.description;
        this.node.style = newnode.style;

        this.title.text(ChartUtils.format(this.node.title, Constants.MAX_TITLE_LENGTH));
        this.description.text(ChartUtils.format(this.node.description));

        this.title.setPosition({
            x: this.node.point.x + Constants.TITLE_OFFSET_X,
            y: this.node.point.y + (this.node.description != '' ? Constants.TITLE_OFFSET_Y : Constants.TITLE_OFFSET_NODESCRIPTION_Y)
        });

        this.box.fill(this.node.style.boxBackgroundColor);
        
        this.icon.destroy();
        this.icon = KonvaUtils.createIcon(FontAwesomeUnicode[this.node.icon], style, this.node.point, Constants.ICON_OFFSET_X, Constants.ICON_OFFSET_Y);
        this.layer.add(this.icon);
    }

    getId() : string {
        return this.node.id;
    }

    getNode() : Node {
        return this.node;
    }

    destroy() {
        this.box.destroy();
        this.title.destroy();
        this.description.destroy();
        this.config.destroy();
        this.icon.destroy();

        if (this.arrow !== undefined && this.arrow !== null) {
            this.arrow.destroy();
        }
    }

    onClickConfig() {
        if (this.onConfigCallback !== null && this.onConfigCallback !== undefined) {
            this.onConfigCallback(ChartUtils.clone(this.node));
        }
    }

    setSelected(isSelected: boolean) {
        if (isSelected) {
            this.box.strokeWidth(2);
            this.box.strokeEnabled(true);
        } else {
            this.box.strokeWidth(0);
            this.box.strokeEnabled(false);
        }        
    }

    relation(hasRelation: boolean) {
        if (this.node.type !== 'E' && this.node.type !== 'C') {
        
            if (hasRelation) {
                this.arrow.hide();
            } else {
                this.arrow.show();
            }
        }       
    }

    protected getStyle(type: string, baseStyle: Style, fontColorToIcon: boolean) {
        let style:any = null;

        switch(type) {
            case 'C':
                style = Object.assign({}, Constants.NODE_BASE, Constants.NODE_CONDITIONAL, baseStyle);
                break;
            case 'S':
            case 'E':
                style = Object.assign({}, baseStyle);
                break;
            default:
                style = Object.assign({}, Constants.NODE_BASE, baseStyle);
                break;
        }
        
        if (fontColorToIcon === true) {
            style.iconColor = baseStyle.fontColor;
        }
        style.titleFontColor = baseStyle.fontColor;
        style.descriptionFontColor = baseStyle.fontColor;
        return style;
    }
}