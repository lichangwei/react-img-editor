import Plugin from './Plugin';
import { DrawEventParams, PluginParamName, PluginParamValue } from '../common/type';
export default class Pen extends Plugin {
    constructor();
    name: string;
    iconfont: string;
    title: string;
    params: PluginParamName[];
    defaultParamValue: PluginParamValue;
    lastLine: any;
    isPaint: boolean;
    onDrawStart: (drawEventParams: DrawEventParams) => void;
    onDraw: (drawEventParams: DrawEventParams) => void;
    onDrawEnd: (drawEventParams: DrawEventParams) => void;
    onLeave: () => void;
}
