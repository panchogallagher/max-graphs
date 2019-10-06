import { Style } from '../object/style';

export class Constants {

    public static NODE_WIDTH:number = 150;
    public static NODE_HEIGHT:number = 35;

    public static TITLE_OFFSET_X:number = 10;
    public static TITLE_OFFSET_Y:number = 5;

    public static DESCRIPTION_OFFSET_X:number = 10;
    public static DESCRIPTION_OFFSET_Y:number = 20;

    public static ICON_OFFSET_X:number = Constants.NODE_WIDTH - 25;
    public static ICON_OFFSET_Y:number = Constants.TITLE_OFFSET_Y;

    public static MAX_TITLE_LENGTH:number = 10;
    public static MAX_DESCRIPTION_LENGTH:number = 18;

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
        titleFontSize: 14,
        titleFontColor: "white",

        descriptionFontFamily: "lato",
        descriptionFontSize: 12,
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

    public static NODE_STYLE:any = {
        S: Constants.NODE_START,
        E: Constants.NODE_END,
        N: Constants.NODE_NORMAL,
        C: Constants.NODE_NORMAL
    };

    public static NODE_TYPES:string[] = ["S","E","N","C"];
}