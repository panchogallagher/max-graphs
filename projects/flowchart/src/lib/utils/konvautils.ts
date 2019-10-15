import { Position } from '../object/position';
import { Style } from '../object/style';
import Konva from 'konva';
import { Node } from '../object/node';
import { Constants } from './constants';
import { ChartUtils } from './chartutils';
import { FullStyle } from '../object/full-style';

export class KonvaUtils {

    /**
     * Creates a new Box for a node
     * @param Position 
     * @param style 
     * @param width 
     * @param height 
     * @param onDragCallback 
     */
    public static createBox(Position:Position, style:FullStyle, width:number, height:number, onDragCallback?:any, onDragStart?:any) : Konva.Rect {
        let rect = new Konva.Rect({
            x: Position.x,
            y: Position.y,
            width: width,
            height: height,
            listening: onDragStart !== null && onDragStart !== undefined,
            fill: style.boxBackgroundColor,
            shadowBlur: style.boxShadowBlur,
            cornerRadius: style.boxCornerRadious,
            shadowOffset: style.boxShadowOffset,
            shadowOpacity: 0.4,
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

        if (onDragStart !== null && onDragStart !== undefined) {
            rect.on('dragstart', onDragStart);
            rect.on('click', onDragStart);
        }

        return rect;
    }

    public static createBoxNoDrag(Position:Position, style:FullStyle, width:number, height:number, onClickCallback?:any) : Konva.Rect {
        let rect = new Konva.Rect({
            x: Position.x,
            y: Position.y,
            width: width,
            height: height,
            listening: onClickCallback !== null && onClickCallback !== undefined,
            fill: style.boxBackgroundColor,
            shadowBlur: style.boxShadowBlur,
            cornerRadius: style.boxCornerRadious,
            shadowOffset: style.boxShadowOffset,
            shadowOpacity: 0.4,
            stroke: style.boxBorderColor,
            strokeWidth: style.boxBorderWidth,
            draggable: false
        });

        if (onClickCallback !== null && onClickCallback !== undefined) {
            rect.on('mouseover', function() {
                document.body.style.cursor = 'pointer';
            });
              
            rect.on('mouseout', function() {
                document.body.style.cursor = 'default';
            });

            rect.on('click', onClickCallback);
        }

        return rect;
    }

    public static createBG(width:number, height:number, onClickCallback?:any) : Konva.Rect {
        let rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: "#eaeaea",
            listening: true 
        });
        if (onClickCallback !== null && onClickCallback !== undefined) {
            rect.on('click', function() {
                console.log('Stage click');
            });
        }

        return rect;
    }

    public static createText(text:string, style:FullStyle, Position:Position, xOffset:number, yOffset:number) : Konva.Text {
        return new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: text,
            listening: false
        });
    }

    public static createTitle(text:string, style:FullStyle, Position:Position, xOffset:number, yOffset:number) : Konva.Text {
        let txt = new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: ChartUtils.format(text, Constants.MAX_TITLE_LENGTH),
            fontSize: style.titleFontSize,
            fontFamily: style.titleFontFamily,
            fill: style.titleFontColor,
            listening: false
        });

        return txt;
    }

    public static createDescription(text:string, style:FullStyle, Position:Position, xOffset:number, yOffset:number) : Konva.Text {
        let txt = new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: ChartUtils.format(text),
            fontSize: style.descriptionFontSize,
            fontFamily: style.descriptionFontFamily,
            fill: style.descriptionFontColor,
            listening: false
        });

        return txt;
    }

    public static createIcon(text:string, style:FullStyle, Position:Position, xOffset:number, yOffset:number, onClickCallback?: any) {
        let icon =  new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: text,
            fontSize: style.iconSize,
            fontFamily: 'FontAwesome',
            fill: style.iconColor,
            listening: onClickCallback !== null && onClickCallback !== undefined
        });

        if (onClickCallback !== null && onClickCallback !== undefined) {
            icon.on('mouseover', function() {
                document.body.style.cursor = 'pointer';
            });
              
            icon.on('mouseout', function() {
                document.body.style.cursor = 'default';
            });

            icon.on('click', onClickCallback);
        }

        return icon;
    }

    public static createCircle(style:FullStyle, Position:Position, xOffset:number, yOffset:number, onClickCallback?: any) {
        let circle =  new Konva.Circle({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            radius: Constants.CIRCLE_RADIOUS,
            fill: Constants.CIRCLE_COLOR,
            stroke: '#cccccc',
            strokeWidth: 1
        });

        if (onClickCallback !== null && onClickCallback !== undefined) {
            circle.on('mouseover', function() {
                document.body.style.cursor = 'pointer';
            });
              
            circle.on('mouseout', function() {
                document.body.style.cursor = 'default';
            });

            circle.on('click', onClickCallback);
        }

        return circle;
    }

    public static createArrow(id: string) {
        return new Konva.Arrow({
            stroke: 'black',
            id: id,
            fill: 'black',
            points: [],
            listening: false,
            draggable: false
        });
    }

    public static getConnectorPoints(originType: string, from: Position, to: Position) {

        let offset = Constants.NODE_DEFINITION[originType];

        let points = [];
        points.push(from.x + offset.relationship.x);
        points.push(from.y + offset.relationship.y);

        points.push(from.x + offset.relationship.x);
        points.push(to.y + Constants.NODE_STATEMENT_HEIGHT/2);

        points.push(to.x);
        points.push(to.y + Constants.NODE_STATEMENT_HEIGHT/2);

        return points;
      }

    public static getNodes(total:number) {
        let nodes = [];
        for(let i = 0; i < total; i++) {
          let node = new Node();
          node.id = (i+1).toString();
          node.width = Constants.NODE_WIDTH;
          node.height = Constants.NODE_HEIGHT;
          node.type = "N";
          node.title = "Title "+(i + 1);
          node.description = "Description "+(i + 1);
          node.icon = "play";
          node.style = new Style();
          node.point = new Position();
          node.point.x = (i+1) * (Math.floor(Math.random() * 6) + 1)  * 3 * 10;
          node.point.y = (i+1) * (Math.floor(Math.random() * 6) + 1)  * 3 * 10;
    
          nodes.push(node);
        }
        return nodes;
    }

    public static getRelationships() {
        let relationships = [];
        relationships.push({
            id:"1",
            fromId:"N1",
            targetId:"N2"
        });

        return relationships;
    }

    public static createEmptyNode(type: string, id: string, x: number, y: number) {

        let definition = Constants.NODE_DEFINITION[type];

        return {
            id: id,
            width: Constants.NODE_WIDTH,
            height: Constants.NODE_HEIGHT,
            type: type,
            title: definition.title,
            description: "",
            icon: definition.icon,
            style: definition.style,
            point: {
                x: x,
                y: y,
            }
        };
    }

    public static createEmptyRelationship(id: string, fromId: string, toId: string) {
        return {
            id: id,
            fromId: fromId,
            toId: toId
        };
    }
}