import { Style } from '../object/style';

export class Constants {

    public static ICON_WIDTH:number = 15;
    public static ICON_STATEMENT_WIDTH:number = 13;
    public static CIRCLE_RADIOUS:number = 12;
    public static CIRCLE_COLOR:string = "white";

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

    public static ICON_PLUS_OFFSET_X:number = Constants.ICON_OFFSET_X + 10;
    public static ICON_PLUS_OFFSET_Y:number = Constants.NODE_HEIGHT + 10;

    public static ICON_PLUS_CIRCLE_OFFSET_X:number = Constants.ICON_PLUS_OFFSET_X + Constants.CIRCLE_RADIOUS/2 + 1;
    public static ICON_PLUS_CIRCLE_OFFSET_Y:number = Constants.ICON_PLUS_OFFSET_Y + Constants.CIRCLE_RADIOUS/2 + 2;

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

    public static NODE_START:any = Object.assign({}, Constants.DEFAULT_STYLE, {
        boxBackgroundColor: "#1DE9B6",
        boxBorderColor: "#1DE9B6"
    });

    public static NODE_END:any = Object.assign({}, Constants.DEFAULT_STYLE, {
        boxBackgroundColor: "#F44336",
        boxBorderColor: "#F44336"
    });

    public static NODE_NORMAL:any = Object.assign({}, Constants.DEFAULT_STYLE, {
        boxBackgroundColor: "#FFFFFF",
        boxBorderColor: "#FFFFFF",
        titleFontColor: "#424242",
        descriptionFontColor: "#424242",
        iconColor: "#424242"
    });

    public static NODE_CONDITIONAL:any = Object.assign({}, Constants.NODE_NORMAL, {
        plusCircleColor: "white",
        plusCircleSize: 20
    });

    public static NODE_STATEMENT:any = Object.assign({}, Constants.NODE_NORMAL, {
        boxCornerRadious: 10,
        iconSize: 14
    });

    public static NODE_STYLE:any = {
        S: Constants.NODE_START,
        E: Constants.NODE_END,
        N: Constants.NODE_NORMAL,
        C: Constants.NODE_NORMAL,
        I: Constants.NODE_NORMAL
    };

    public static NODE_TYPES:string[] = ["S","E","N","C"];

    public static NODE_DEFINITION:any = {
        S: {
            style: Constants.NODE_START,
            icon: 'play',
            title: 'Punto entrada'
        },
        E: {
            style: Constants.NODE_END,
            icon: 'stop',
            title: 'Punto término'
        },
        N: {
            style: Constants.NODE_NORMAL,
            icon: 'arrow-right',
            title: 'Envía mensaje'
        },
        C: {
            style: Constants.NODE_CONDITIONAL,
            icon: 'list-ul',
            title: 'Evaluar entrante'
        },
        I: {
            style: Constants.NODE_STATEMENT,
            icon: 'chevron-right',
            title: 'Condición'
        }
    }
}