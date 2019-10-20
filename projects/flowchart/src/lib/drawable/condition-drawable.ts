import { NodeDrawable } from './node-drawable';
import { Layer } from 'konva/types/Layer';
import { Circle } from 'konva/types/shapes/Circle';
import { Text } from 'konva/types/shapes/Text';
import { KonvaUtils } from '../utils/konvautils';
import { FontAwesomeUnicode } from '../utils/fontawesome-unicode';
import { Constants } from '../utils/constants';

export class ConditionDrawable extends NodeDrawable {

    private iconPlus:Text;
    private circlePlus:Circle;
    private totalChilds:number = 0;

    draw(layer:Layer) {
        super.draw(layer);

        this.circlePlus = KonvaUtils.createCircle(this.node.style,this.node.point,Constants.ICON_PLUS_CIRCLE_OFFSET_X, Constants.ICON_PLUS_CIRCLE_OFFSET_Y, this.onClickPlus.bind(this));
        this.iconPlus = KonvaUtils.createIcon(FontAwesomeUnicode.plus, this.node.style, this.node.point, Constants.ICON_PLUS_OFFSET_X, Constants.ICON_PLUS_OFFSET_Y, this.onClickPlus.bind(this));
        
        layer.add(this.circlePlus);
        layer.add(this.iconPlus);
    }

    destroy() {
        super.destroy();
        this.circlePlus.destroy();
        this.iconPlus.destroy();
    }

    onDrag(e:any) {
        super.onDrag(e);

        this.circlePlus.setPosition({
            x: this.node.point.x + Constants.ICON_PLUS_CIRCLE_OFFSET_X,
            y: this.node.point.y + Constants.ICON_PLUS_CIRCLE_OFFSET_Y
        });

        this.iconPlus.setPosition({
            x: this.node.point.x + Constants.ICON_PLUS_OFFSET_X,
            y: this.node.point.y + Constants.ICON_PLUS_OFFSET_Y
        });

        this.graphService.positionChanged(this.node);
    }

    onClickPlus() {
        this.graphService.createStatement({
            parentNode: this.node,
            totalChilds: this.totalChilds
        });

        this.totalChilds++;
    }

    removeChild() {
        if (this.totalChilds > 0) {
            this.totalChilds--;
        }
    }
}