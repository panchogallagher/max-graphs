import { Position } from '../object/position';
import { Style } from '../object/style';
import Konva from 'konva';

export class KonvaUtils {

    /**
     * Creates a new Box for a node
     * @param Position 
     * @param style 
     * @param width 
     * @param height 
     * @param onDragCallback 
     */
    public static createBox(Position:Position, style:Style, width:number, height:number, onDragCallback?:any) : Konva.Rect {
        let rect = new Konva.Rect({
            x: Position.x,
            y: Position.y,
            width: width,
            height: height,
            fill: style.boxBackgroundColor,
            shadowBlur: style.boxShadowBlur,
            cornerRadius: style.boxCornerRadious,
            stroke: style.boxBorderColor,
            strokeWidth: style.boxBorderWidth,
            draggable: true
        });

        rect.on('mouseover', function() {
            document.body.style.cursor = 'move';
        });
          
        rect.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        if (onDragCallback !== null && onDragCallback !== undefined) {
            rect.on('dragmove', onDragCallback);
        }

        return rect;
    }

    public static createText(text:string, style:Style, Position:Position, xOffset:number, yOffset:number) : Konva.Text {
        return new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: text,
        });
    }

    public static createTitle(text:string, style:Style, Position:Position, xOffset:number, yOffset:number) : Konva.Text {
        return new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: text,
            fontSize: style.titleFontSize,
            fontFamily: style.titleFontFamily,
            fill: style.titleFontColor
        });
    }

    public static createDescription(text:string, style:Style, Position:Position, xOffset:number, yOffset:number) : Konva.Text {
        return new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: text,
            fontSize: style.descriptionFontSize,
            fontFamily: style.descriptionFontFamily,
            fill: style.descriptionFontColor
        });
    }

    public static createIcon(text:string, style:Style, Position:Position, xOffset:number, yOffset:number, onClickCallback?: any) {
        let icon =  new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: text,
            fontSize: style.iconSize,
            fontFamily: 'FontAwesome',
            fill: style.iconColor
        });

        icon.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
          
        icon.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        if (onClickCallback !== null && onClickCallback !== undefined) {
            icon.on('click', onClickCallback);
        }

        return icon;
    }
}