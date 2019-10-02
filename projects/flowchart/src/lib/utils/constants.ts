import { Style } from '../object/style';

export class Constants {

    public static NODE_WIDTH:number = 120;
    public static NODE_HEIGHT:number = 60;

    public static TITLE_OFFSET_X:number = 10;
    public static TITLE_OFFSET_Y:number = 10;

    public static DESCRIPTION_OFFSET_X:number = 10;
    public static DESCRIPTION_OFFSET_Y:number = 30;

    public static ICON_OFFSET_X:number = Constants.NODE_WIDTH - 25;
    public static ICON_OFFSET_Y:number = Constants.TITLE_OFFSET_Y;

    public static DEFAULT_STYLE:any = {
        boxBackgroundColor: "red",
        boxBorderWidth: 1,
        boxBorderColor: "red",
        boxShadowBlur: 5,
        boxCornerRadious: 5,

        titleFontFamily: "arial",
        titleFontSize: 18,
        titleFontColor: "white",

        descriptionFontFamily: "arial",
        descriptionFontSize: 12,
        descriptionFontColor: "white",

        iconSize: 18,
        iconColor: "white"
    };
}