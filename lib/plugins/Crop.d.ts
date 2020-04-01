import Plugin from './Plugin';
import { DrawEventParams } from '../common/type';
export default class Crop extends Plugin {
    constructor();
    name: string;
    iconfont: string;
    title: string;
    params: never[];
    isPaint: boolean;
    virtualLayer: any;
    rect: any;
    transformer: any;
    toolbarId: string;
    getRectWidth: () => any;
    getRectHeight: () => any;
    getRectX: () => any;
    getRectY: () => any;
    adjustToolbarPosition: (stage: any) => void;
    createCropToolbar: (stage: any, sureBtnEvent: () => void, cancelBtnEvent: () => void) => void;
    reset: (stage: any) => void;
    onEnter: (drawEventParams: DrawEventParams) => void;
    onDrawStart: (drawEventParams: DrawEventParams) => void;
    onDraw: (drawEventParams: DrawEventParams) => void;
    onDrawEnd: (drawEventParams: DrawEventParams) => void;
    onLeave: (drawEventParams: DrawEventParams) => void;
}
