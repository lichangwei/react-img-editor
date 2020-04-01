import Plugin from './Plugin';
import { DrawEventParams, PluginParamValue, PluginParamName } from '../common/type';
export default class Mosaic extends Plugin {
    constructor();
    name: string;
    iconfont: string;
    title: string;
    params: PluginParamName[];
    defaultParamValue: PluginParamValue;
    isPaint: boolean;
    tiles: any;
    tileRowSize: number;
    tileColumnSize: number;
    width: number;
    height: number;
    rectGroup: any;
    drawTile: (tiles: any, drawLayer: any) => void;
    getTilesByPoint: (x: number, y: number, strokeWidth: number) => any;
    onDrawStart: (drawEventParams: DrawEventParams) => void;
    onDraw: (drawEventParams: DrawEventParams) => void;
    onDrawEnd: (drawEventParams: DrawEventParams) => void;
    onLeave: () => void;
}
