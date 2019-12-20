import { Setting } from '../object/setting';

export class Constants {

    public static BG_IMAGE_SRC = './assets/images/grid-layer.png';
    public static NODE_ID_PREFIX:string = "N";

    public static ZOOM_MAX:number = 1.5;
    public static ZOOM_MIN:number = 0.4;
    public static ZOOM_INITIAL:number = 1.0;
    public static ZOOM_CHANGE:number = 0.1;

    public static CANVAS_MAXWIDTH:number = 2230;
    public static CANVAS_MAXHEIGHT:number = 1245;

    public static ICON_WIDTH:number = 15;
    public static ICON_STATEMENT_WIDTH:number = 13;
    public static CIRCLE_RADIOUS:number = 12;
    public static CIRCLE_COLOR:string = "white";
    public static POINT_RADIOUS:number = 6;
    public static COLOR_SELECTION:string = "#80bdff";
    public static COLOR_ARROW:string = "#333333";
    public static POINT_COLOR:string = Constants.COLOR_ARROW;

    public static NODE_WIDTH:number = 150;
    public static NODE_HEIGHT:number = 35;
    public static NODE_MARGIN:number = 10;
    public static NODE_STATEMENT_HEIGHT:number = 25;

    public static ICON_OFFSET_X:number = Constants.NODE_MARGIN;
    public static ICON_OFFSET_Y:number = Constants.NODE_HEIGHT/2 - Constants.ICON_WIDTH/2;
    public static ICON_STATEMENT_OFFSET_Y:number = Constants.NODE_STATEMENT_HEIGHT/2 - Constants.ICON_STATEMENT_WIDTH/2;

    public static TITLE_OFFSET_X:number = Constants.ICON_OFFSET_X + Constants.ICON_WIDTH + Constants.NODE_MARGIN;
    public static TITLE_OFFSET_Y:number = 5;
    public static TITLE_OFFSET_NODESCRIPTION_Y:number = Constants.ICON_OFFSET_Y + 2;
    public static TITLE_STATEMENT_OFFSET_Y:number = 6;

    public static DESCRIPTION_OFFSET_X:number = Constants.TITLE_OFFSET_X;
    public static DESCRIPTION_OFFSET_Y:number = Constants.TITLE_OFFSET_Y + 15;

    public static ICON_CONFIG_OFFSET_X:number = Constants.NODE_WIDTH - 25;
    public static ICON_CONFIG_OFFSET_Y:number = Constants.TITLE_OFFSET_Y;

    public static ICON_ARROW_OFFSET_X:number = Constants.NODE_WIDTH + 5;
    public static ICON_ARROW_OFFSET_Y:number = Constants.ICON_OFFSET_Y + 10;

    public static ICON_CIRCLERELATION_OFFSET_X:number = Constants.NODE_WIDTH + 10;
    public static ICON_CIRCLERELATION_OFFSET_Y:number = Constants.ICON_OFFSET_Y + 10;

    public static ICON_STATEMENT_CIRCLERELATION_OFFSET_X:number = Constants.ICON_CIRCLERELATION_OFFSET_X;
    public static ICON_STATEMENT_CIRCLERELATION_OFFSET_Y:number = Constants.ICON_OFFSET_Y + 2;

    public static ICON_PLUS_OFFSET_X:number = Constants.ICON_OFFSET_X + 10;
    public static ICON_PLUS_OFFSET_Y:number = Constants.NODE_HEIGHT + 10;

    public static ICON_PLUS_CIRCLE_OFFSET_X:number = Constants.ICON_PLUS_OFFSET_X + Constants.CIRCLE_RADIOUS/2 + 1;
    public static ICON_PLUS_CIRCLE_OFFSET_Y:number = Constants.ICON_PLUS_OFFSET_Y + Constants.CIRCLE_RADIOUS/2 + 2;

    public static CONDITION_OFFSET_X:number = Constants.ICON_PLUS_OFFSET_X + 25;
    public static CONDITION_OFFSET_Y:number = Constants.ICON_PLUS_OFFSET_Y + 20;
    public static CONDITION_NODE_OFFSET_Y:number = 40;

    public static MAX_TITLE_LENGTH:number = 16;
    public static MAX_DESCRIPTION_LENGTH:number = 19;

    public static DEFAULT_STYLE:any = {
        boxBackgroundColor: "#1DE9B6",
        boxBorderWidth: 1,
        boxBorderColor: "#1DE9B6",
        boxShadowBlur: 3,
        boxShadowOffset: {
            x: 2,
            y: 2
        },
        boxCornerRadious: 0,

        titleFontFamily: "lato",
        titleFontSize: 12,
        titleFontColor: "white",

        descriptionFontFamily: "lato",
        descriptionFontSize: 10,
        descriptionFontColor: "white",

        iconSize: 18,
        iconColor: "white"
    };

    public static BASE_STYLE:any = {
        boxBackgroundColor: "#1DE9B6",
        boxBorderWidth: 1,
        boxBorderColor: "#1DE9B6"
    };

    public static NODE_START:any = Object.assign({}, Constants.BASE_STYLE, {
        boxBackgroundColor: "#1DE9B6",
        boxBorderColor: Constants.COLOR_SELECTION,
        boxBorderWidth: 1
    });

    public static NODE_END:any = Object.assign({}, Constants.BASE_STYLE, {
        boxBackgroundColor: "#F44336",
        boxBorderColor: Constants.COLOR_SELECTION,
        boxBorderWidth: 1
    });

    public static NODE_BASE:any = Object.assign({}, Constants.BASE_STYLE, {
        boxBackgroundColor: "#FFFFFF",
        boxBorderColor: Constants.COLOR_SELECTION,
        boxBorderWidth: 1,
        titleFontColor: "#424242",
        descriptionFontColor: "#424242",
        iconColor: "#424242"
    });

    public static NODE_NORMAL:any = Object.assign({}, Constants.BASE_STYLE, {
        boxBackgroundColor: "#FFFFFF",
        boxBorderColor: Constants.COLOR_SELECTION,
        boxBorderWidth: 1
    });

    public static NODE_CONDITIONAL:any = Object.assign({}, Constants.BASE_STYLE, {
        plusCircleColor: "white",
        plusCircleSize: 20
    });

    public static NODE_STATEMENT:any = Object.assign({}, Constants.BASE_STYLE, {
        boxCornerRadious: 10,
        iconSize: 14
    });

    public static DEFAULT_RELATIONSHIP:any = {
        x: Constants.NODE_WIDTH,
        y: Constants.NODE_HEIGHT/2
    };

    public static CONDITION_RELATIONSHIP:any = {
        x: Constants.ICON_PLUS_OFFSET_X + Constants.ICON_WIDTH/2,
        y: Constants.ICON_PLUS_OFFSET_Y + Constants.ICON_WIDTH + 5
    };

    public static NODE_DEFINITION:any = {
        S: {
            style: Constants.NODE_START,
            icon: 'play',
            title: 'Punto entrada',
            relationship: Constants.DEFAULT_RELATIONSHIP
        },
        E: {
            style: Constants.NODE_END,
            icon: 'stop',
            title: 'Punto término'
        },
        N: {
            style: Constants.NODE_NORMAL,
            icon: 'arrow-right',
            title: 'Envía mensaje',
            relationship: Constants.DEFAULT_RELATIONSHIP
        },
        C: {
            style: Constants.NODE_NORMAL,
            icon: 'list-ul',
            title: 'Evaluar entrante',
            relationship: Constants.CONDITION_RELATIONSHIP
        },
        I: {
            style: Constants.NODE_NORMAL,
            icon: 'chevron-right',
            title: 'Condición',
            relationship: Constants.DEFAULT_RELATIONSHIP
        }
    };

    public static NO_RELATION_TYPE: string[] = ['S'];

    public static DEFAULT_SETTINGS: Setting = {
        width: Constants.CANVAS_MAXWIDTH,
        height: Constants.CANVAS_MAXHEIGHT
    }
}