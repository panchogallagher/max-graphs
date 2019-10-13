import { Layer } from 'konva/types/Layer';
import { IDrawable } from './i-drawable';
import { Node } from '../object/node';
import { Rect } from 'konva/types/shapes/Rect';
import { Text } from 'konva/types/shapes/Text';
import { ChartUtils } from '../utils/chartutils';
import { Constants } from '../utils/constants';
import { KonvaUtils } from '../utils/konvautils';
import { FontAwesomeUnicode } from '../utils/fontawesome-unicode';

export class StatementDrawable implements IDrawable {

    public node:Node;

    public box:Rect;
    public title:Text;
    public icon:Text;

    private onClickCallback:any;

    constructor(node:Node, onClickCallback?:any) {
        this.node = node;
        this.onClickCallback = onClickCallback;
    }

    getNode(): Node {
        return this.node;
    }    
    
    getId(): string {
        return this.node.id;
    }

    draw(layer: Layer): void {
        this.box = KonvaUtils.createBox(this.node.point, this.node.style, Constants.NODE_WIDTH, Constants.NODE_HEIGHT);
        this.title = KonvaUtils.createTitle(this.node.title, this.node.style, this.node.point, Constants.TITLE_OFFSET_X, this.node.description != '' ? Constants.TITLE_OFFSET_Y : Constants.TITLE_OFFSET_NODESCRIPTION_Y);

        layer.add(this.box);
        layer.add(this.title);

        if (this.node.icon !== null) {
            this.icon = KonvaUtils.createIcon(FontAwesomeUnicode[this.node.icon], this.node.style, this.node.point, Constants.ICON_OFFSET_X, Constants.ICON_OFFSET_Y);
            layer.add(this.icon);
        }
    }

    update(newnode: Node): void {
        this.node.title = newnode.title;
        this.node.description = newnode.description;

        this.title.text(ChartUtils.format(this.node.title, Constants.MAX_TITLE_LENGTH));

        this.title.setAbsolutePosition({
            x: this.node.point.x + Constants.TITLE_OFFSET_X,
            y: this.node.point.y + (this.node.description != '' ? Constants.TITLE_OFFSET_Y : Constants.TITLE_OFFSET_NODESCRIPTION_Y)
        });
    }

    destroy(): void {
        this.box.destroy();
        this.title.destroy();
        this.icon.destroy();
    }
}