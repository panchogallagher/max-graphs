import { Position } from '../object/position';
import { Style } from '../object/style';
import Konva from 'konva';
import { Node } from '../object/node';
import { Constants } from './constants';
import { ChartUtils } from './chartutils';
import { FullStyle } from '../object/full-style';
import { Relationship } from '../object/relationship';
import { Element } from '../object/element';

export class KonvaUtils {

    public static createGroup(position:Position, onDragCallback?:any, onDragStart?:any) : Konva.Group {

        let group = new Konva.Group({
            x: position.x,
            y: position.y,
            listening: onDragStart !== null && onDragStart !== undefined,
            draggable: true
        });

        group.on('mouseover', function() {
            document.body.style.cursor = 'move';
        });
          
        group.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        if (onDragCallback !== null && onDragCallback !== undefined) {
            group.on('dragmove', onDragCallback);
        }

        if (onDragStart !== null && onDragStart !== undefined) {
            group.on('dragstart', onDragStart);
            group.on('click', onDragStart);
        }

        return group;
    }

    /**
     * Creates a new Box for a node
     * @param Position 
     * @param style 
     * @param width 
     * @param height 
     * @param onDragCallback 
     */
    public static createBox(Position:Position, baseStyle:Style, width:number, height:number, onDragCallback?:any, onDragStart?:any) : Konva.Rect {
        let style = Object.assign({}, Constants.DEFAULT_STYLE, baseStyle);
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

    public static createBoxNoDrag(Position:Position, baseStyle:Style, width:number, height:number, onClickCallback?:any) : Konva.Rect {
        let style = Object.assign({}, Constants.DEFAULT_STYLE, baseStyle);
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
            rect.on('click', onClickCallback);
        }

        return rect;
    }

    public static createImageBG(width:number, height:number, layer:Konva.Layer, onClickCallback?:any) : void {
        var imageObj = new Image();

        imageObj.onload = () => {
            var image = new Konva.Image({
                image: imageObj,
                x: 0,
                y: 0,
                width: width,
                height: height,
                listening: true 
            });

            if (onClickCallback !== null && onClickCallback !== undefined) {
                image.on('click', onClickCallback);
            }

            layer.add(image);
            layer.draw();
        };

        imageObj.src = Constants.BG_IMAGE_SRC;
    }

    public static createText(text:string, baseStyle:Style, Position:Position, xOffset:number, yOffset:number, maxLength:number) : Konva.Text {
        let style = Object.assign({}, Constants.DEFAULT_STYLE, baseStyle);
        return new Konva.Text({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            text: ChartUtils.format(text, maxLength),
            fontSize: style.titleFontSize,
            fontFamily: style.titleFontFamily,
            fill: style.titleFontColor,
            listening: false
        });
    }

    public static createTitle(text:string, baseStyle:Style, Position:Position, xOffset:number, yOffset:number) : Konva.Text {
        let style = Object.assign({}, Constants.DEFAULT_STYLE, baseStyle);

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

    public static createDescription(text:string, baseStyle:Style, Position:Position, xOffset:number, yOffset:number) : Konva.Text {
        let style = Object.assign({}, Constants.DEFAULT_STYLE, baseStyle);
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

    public static createIcon(text:string, baseStyle:Style, Position:Position, xOffset:number, yOffset:number, onClickCallback?: any) {
        let style = Object.assign({}, Constants.DEFAULT_STYLE, baseStyle);
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

    public static createCircle(baseStyle:Style, Position:Position, xOffset:number, yOffset:number, onClickCallback?: any) {
        let style = Object.assign({}, Constants.DEFAULT_STYLE, baseStyle);
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

    public static createCircleDragged(baseStyle:Style, Position:Position, xOffset:number, yOffset:number, onClickCallback?: any, onDragMoveCallback?:any, onDragEndCallback?:any) {
        let circle =  new Konva.Circle({
            x: Position.x + xOffset,
            y: Position.y + yOffset,
            radius: Constants.POINT_RADIOUS,
            fill: Constants.POINT_COLOR,
            stroke: '#cccccc',
            strokeWidth: 1,
            listening: onClickCallback !== null && onClickCallback !== undefined,
            draggable: onDragMoveCallback !== null && onDragMoveCallback !== undefined
        });

        if (onClickCallback !== null && onClickCallback !== undefined) {
            circle.on('mouseover', function() {
                document.body.style.cursor = 'pointer';
            });
              
            circle.on('mouseout', function() {
                document.body.style.cursor = 'default';
            });

            circle.on('click', onClickCallback);
            circle.on('dragstart', onClickCallback);
        }

        if (onDragMoveCallback !== null && onDragMoveCallback !== undefined) {
            circle.on('dragmove', onDragMoveCallback);
        }

        if (onDragEndCallback !== null && onDragEndCallback !== undefined) {
            circle.on('dragend', onDragEndCallback);
        }

        return circle;
    }

    public static createArrow(id: string, onClickCallback?:any, onDragCallback?:any) {
        let arrow = new Konva.Arrow({
            stroke: Constants.COLOR_ARROW,
            id: id,
            fill: Constants.COLOR_ARROW,
            points: [],
            strokeWidth: 2,
            listening: onClickCallback !== null && onClickCallback !== undefined,
            draggable: onDragCallback !== null && onDragCallback !== undefined
        });

        if (onClickCallback !== null && onClickCallback !== undefined) {
            arrow.on('mouseover', function() {
                document.body.style.cursor = 'pointer';
            });
              
            arrow.on('mouseout', function() {
                document.body.style.cursor = 'default';
            });

            arrow.on('click', onClickCallback);
        }

        if (onDragCallback !== null && onDragCallback !== undefined) {
            arrow.on('dragmove', onDragCallback);
        }

        return arrow;
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

    public static createEmptyNode(type: string, id: string, x: number, y: number, baseStyle: Style) {
        let definition = Object.assign({}, Constants.NODE_DEFINITION[type]);
        let style = Object.assign({}, definition.style, baseStyle);

        return {
            id: id,
            width: Constants.NODE_WIDTH,
            height: Constants.NODE_HEIGHT,
            type: type,
            typeID: type,
            title: definition.title,
            description: "",
            icon: definition.icon,
            style: style,
            point: {
                x: x,
                y: y,
            }
        };
    }

    public static createEmptyNodeElement(element: Element, id: string, x: number, y: number) {
        let definition = Object.assign({}, element);

        return {
            id: id,
            width: Constants.NODE_WIDTH,
            height: Constants.NODE_HEIGHT,
            type: definition.type,
            typeID: definition.typeID,
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

    public static createEmptyRelationship(id: string, fromNode: Node, toNode: Node) : Relationship {
        return {
            id: id,
            fromId: fromNode.id,
            toId: toNode.id,
            points: KonvaUtils.getConnectorPoints(fromNode.type, fromNode.point, toNode.point)
        };
    }

    public static getConnectorPoints(originType: string, from: Position, to: Position) {
        let offset = Constants.NODE_DEFINITION[originType];
        return originType === 'C' ? KonvaUtils.getPointsCondition(from, to, offset) : KonvaUtils.getPointsNodes(from, to, offset);
    }

    public static getPointsCondition(from: Position, to: Position, offset: any) {

        const fromX = from.x + offset.relationship.x;
        const fromY = from.y + offset.relationship.y;
        const toY = to.y + Constants.NODE_STATEMENT_HEIGHT/2;

        let points = [];
        points.push(fromX);
        points.push(fromY);

        if (fromX < to.x - 15) {
            // target node to the right
            points.push(fromX);
            points.push(toY);
        } else {
            // target node to the left
            points.push(fromX);
            points.push(fromY);

            const y1 = fromY + 15;

            points.push(fromX);
            points.push(y1);

            const x2 = to.x - 18;

            points.push(x2);
            points.push(y1);

            points.push(x2);
            points.push(toY);
        }

        points.push(to.x);
        points.push(toY);

        return points;
    }

    public static getPointsNodes(from: Position, to: Position, offset: any) {

        let fromX = from.x + offset.relationship.x;
        let fromY = from.y + offset.relationship.y;
        const toY = to.y + Constants.NODE_STATEMENT_HEIGHT/2 + 5;

        let points = [];

        if (fromX + 15 < to.x - 25) {
            points.push(fromX);
            points.push(fromY);

            // target node to the right
            const x1 = fromX + (to.x - fromX) / 2;

            points.push(x1);
            points.push(fromY);

            points.push(x1);
            points.push(toY);
        } else {
            // target node to the left
            fromX = from.x + Constants.NODE_WIDTH/2;
            fromY = to.y > from.y ? from.y : from.y + Constants.NODE_HEIGHT;

            points.push(fromX);
            points.push(fromY);

            points.push(fromX);

            if (fromX + 25 < to.x) {
                points.push(toY);
            } else {
                const y1 = fromY + (toY - fromY)/2;

                points.push(y1);

                const x2 = to.x - 25;

                points.push(x2);
                points.push(y1);

                points.push(x2);
                points.push(toY);
            }
        }

        points.push(to.x);
        points.push(toY);

        return points;
    }

    public static getRelationTitlePoint(points: number[], text:string, style:FullStyle, toNode: Node) : Position {
        let position:Position = null;
        let fontSize:number = style.titleFontSize !== null && style.titleFontSize !== undefined ? style.titleFontSize : 12;

        if (toNode.type === 'I') {
            if (points.length === 6) {
                position = {
                    x: points[0] + 6,
                    y: points[3] - fontSize
                };
            } else {
                position = {
                    x: points[8] + 6,
                    y: points[9] - Constants.NODE_HEIGHT + 6
                };
            }
        } else if (points.length === 8) {
            position = {
                x: points[2] - (text.length/2 * 6),
                y: (points[3] + points[5])/2 - fontSize
            };
        } else if (points.length === 6) {
            position = {
                x: points[2] - (text.length/2 * 6),
                y: (points[1] + points[3])/2 - fontSize/2
            };
        } else if (points.length === 10) {
            position = {
                x: (points[4] + points[2])/2 - (text.length/2 * 6),
                y: points[5] + fontSize/2 
            };
        } else {
            position = {
                x: points[2],
                y: (points[3] + points[5])/2
            };
        }
        return position;
    }

    public static getRelationTitleLength(points: number[], style:FullStyle, title: string, toNode: Node) : number {
        let fontSize:number = (style.titleFontSize !== null && style.titleFontSize !== undefined ? style.titleFontSize : 12) / 2;
        let maxX = Math.round(Math.abs(points[0] - points[points.length - 2]) / fontSize);

        if (toNode.type === 'I') {
            if (points.length === 12) {
                maxX = Constants.NODE_WIDTH/fontSize;
            } else {
                maxX -= 30/fontSize;
            }
        } else {
            maxX -= 50/fontSize;
        }

        let diffY = Math.abs(points[1] - points[points.length - 1]);
        return diffY > Constants.NODE_HEIGHT + 40 
            && 
            (toNode.type !== 'C' || points[1] - points[points.length - 1] < 0)  
            && 
            (toNode.type !== 'I')  
            ? title.length : maxX;
    }
}