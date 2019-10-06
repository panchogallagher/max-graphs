import { Layer } from 'konva/types/Layer';
import { Rect } from 'konva/types/shapes/Rect';
import { Text } from 'konva/types/shapes/Text';
import { Node } from '../object/node';
import { KonvaUtils } from '../utils/konvautils';
import { Constants } from '../utils/constants';
import { ChartUtils } from '../utils/chartutils';

export class NodeDrawable {

    public node:Node;

    public box:Rect;
    public title:Text;
    public description:Text;
    public config:Text;

    private onClickCallback:any;

    constructor(node:Node, onClickCallback?:any) {
        this.node = node;
        this.onClickCallback = onClickCallback;
    }

    draw(layer:Layer) {
        this.box = KonvaUtils.createBox(this.node.point, this.node.style, Constants.NODE_WIDTH, Constants.NODE_HEIGHT, this.onDrag.bind(this), this.onDragStart.bind(this));
        this.title = KonvaUtils.createTitle(this.node.title, this.node.style, this.node.point, Constants.TITLE_OFFSET_X, Constants.TITLE_OFFSET_Y);
        this.description = KonvaUtils.createDescription(this.node.description, this.node.style, this.node.point, Constants.DESCRIPTION_OFFSET_X, Constants.DESCRIPTION_OFFSET_Y);
        this.config = KonvaUtils.createIcon('\uf013', this.node.style, this.node.point, Constants.ICON_OFFSET_X, Constants.ICON_OFFSET_Y, this.onClickConfig.bind(this));

        layer.add(this.box);
        layer.add(this.title);
        layer.add(this.description);
        layer.add(this.config);
    }

    onDrag(e:any) {
        this.node.point.x = e.target.attrs.x;
        this.node.point.y = e.target.attrs.y;

        this.title.setAbsolutePosition({
            x: this.node.point.x + Constants.TITLE_OFFSET_X,
            y: this.node.point.y + Constants.TITLE_OFFSET_Y
        });

        this.description.setAbsolutePosition({
            x: this.node.point.x + Constants.DESCRIPTION_OFFSET_X,
            y: this.node.point.y + Constants.DESCRIPTION_OFFSET_Y
        });

        this.config.setAbsolutePosition({
            x: this.node.point.x + Constants.ICON_OFFSET_X,
            y: this.node.point.y + Constants.ICON_OFFSET_Y
        });
    }

    onDragStart() {
        if (this.onClickCallback !== null && this.onClickCallback !== undefined) {
            this.onClickCallback(this.node);
        }
    }

    update(node: Node) {
        this.node = Object.assign({}, node);

        this.title.text(ChartUtils.format(node.title, Constants.MAX_TITLE_LENGTH));
        this.description.text(ChartUtils.format(node.description));
    }

    onClickConfig() {
        alert("icon clicked nodeId: " + this.node.id);
    }
}