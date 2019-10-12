import { Constants } from '../utils/constants';
import { FullStyle } from './full-style';

export class Style {

    public boxBackgroundColor?:string = Constants.DEFAULT_STYLE.boxBackgroundColor;
    public boxBorderWidth?:number  = Constants.DEFAULT_STYLE.boxBorderWidth;
    public boxBorderColor?:string  = Constants.DEFAULT_STYLE.boxBorderColor;
}