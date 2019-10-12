import { Constants } from '../utils/constants';
import { Style } from './style';

export class FullStyle extends Style {

    public boxBackgroundColor?:string = Constants.DEFAULT_STYLE.boxBackgroundColor;
    public boxBorderWidth?:number  = Constants.DEFAULT_STYLE.boxBorderWidth;
    public boxBorderColor?:string  = Constants.DEFAULT_STYLE.boxBorderColor;
    public boxShadowBlur?:number  = Constants.DEFAULT_STYLE.boxShadowBlur;
    public boxShadowOffset?:any = Constants.DEFAULT_STYLE.boxShadowOffset;
    public boxCornerRadious?:number  = Constants.DEFAULT_STYLE.boxCornerRadious;

    public titleFontFamily?:string  = Constants.DEFAULT_STYLE.titleFontFamily;
    public titleFontSize?:number = Constants.DEFAULT_STYLE.titleFontSize;
    public titleFontColor?:string = Constants.DEFAULT_STYLE.titleFontColor;

    public descriptionFontFamily?:string = Constants.DEFAULT_STYLE.titleFontColor;
    public descriptionFontSize?:number = Constants.DEFAULT_STYLE.descriptionFontSize;
    public descriptionFontColor?:string = Constants.DEFAULT_STYLE.descriptionFontColor;

    public iconSize?:number = Constants.DEFAULT_STYLE.iconSize;
    public iconColor?:string = Constants.DEFAULT_STYLE.iconColor;

}